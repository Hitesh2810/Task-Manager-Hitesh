import random

from django.conf import settings
from django.core.mail import send_mail

from .models import UserOTP


def generate_otp():
    return f'{random.randint(100000, 999999)}'


def send_otp_email(user, purpose):
    code = generate_otp()
    UserOTP.create_otp(user=user, purpose=purpose, code=code)
    subject = 'Verify your email' if purpose == UserOTP.Purpose.EMAIL_VERIFICATION else 'Reset your password'
    message = f'Your Task Manager OTP is {code}. It expires in 10 minutes.'
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)
    return code
