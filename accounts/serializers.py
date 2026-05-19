from django.contrib.auth import get_user_model, password_validation
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import UserOTP
from .utils import send_otp_email

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'full_name', 'phone', 'profile_image',
            'bio', 'role', 'is_verified', 'created_at', 'updated_at',
        )
        read_only_fields = ('id', 'email', 'role', 'is_verified', 'created_at', 'updated_at')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'full_name', 'phone', 'password')
        read_only_fields = ('id',)

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(password=password, **validated_data)
        send_otp_email(user, UserOTP.Purpose.EMAIL_VERIFICATION)
        return user


class LoginSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user, context=self.context).data
        return data


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            self.user = User.objects.get(email__iexact=value)
        except User.DoesNotExist as exc:
            raise serializers.ValidationError('No account exists with this email.') from exc
        return value

    def save(self, **kwargs):
        send_otp_email(self.user, UserOTP.Purpose.PASSWORD_RESET)


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate_new_password(self, value):
        password_validation.validate_password(value)
        return value

    def validate(self, attrs):
        try:
            user = User.objects.get(email__iexact=attrs['email'])
        except User.DoesNotExist as exc:
            raise serializers.ValidationError({'email': 'Invalid email or OTP.'}) from exc
        otp = UserOTP.objects.filter(
            user=user,
            purpose=UserOTP.Purpose.PASSWORD_RESET,
            used_at__isnull=True,
        ).order_by('-created_at').first()
        if not otp or not otp.verify(attrs['otp']):
            raise serializers.ValidationError({'otp': 'Invalid or expired OTP.'})
        attrs['user'] = user
        attrs['otp_obj'] = otp
        return attrs

    def save(self, **kwargs):
        user = self.validated_data['user']
        user.set_password(self.validated_data['new_password'])
        user.save(update_fields=['password'])
        self.validated_data['otp_obj'].mark_used()


class VerifyEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

    def validate(self, attrs):
        try:
            user = User.objects.get(email__iexact=attrs['email'])
        except User.DoesNotExist as exc:
            raise serializers.ValidationError({'email': 'Invalid email or OTP.'}) from exc
        otp = UserOTP.objects.filter(
            user=user,
            purpose=UserOTP.Purpose.EMAIL_VERIFICATION,
            used_at__isnull=True,
        ).order_by('-created_at').first()
        if not otp or not otp.verify(attrs['otp']):
            raise serializers.ValidationError({'otp': 'Invalid or expired OTP.'})
        attrs['user'] = user
        attrs['otp_obj'] = otp
        return attrs

    def save(self, **kwargs):
        user = self.validated_data['user']
        user.is_verified = True
        user.save(update_fields=['is_verified'])
        self.validated_data['otp_obj'].mark_used()


class ResendVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            self.user = User.objects.get(email__iexact=value)
        except User.DoesNotExist as exc:
            raise serializers.ValidationError('No account exists with this email.') from exc
        return value

    def save(self, **kwargs):
        send_otp_email(self.user, UserOTP.Purpose.EMAIL_VERIFICATION)


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate_old_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError('Old password is incorrect.')
        return value

    def validate_new_password(self, value):
        password_validation.validate_password(value, self.context['request'].user)
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save(update_fields=['password'])
