from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import User, UserOTP


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    list_display = ('email', 'username', 'full_name', 'role', 'is_verified', 'is_staff', 'created_at')
    list_filter = ('role', 'is_verified', 'is_staff', 'is_active', 'created_at')
    search_fields = ('email', 'username', 'full_name', 'phone')
    ordering = ('email',)
    fieldsets = DjangoUserAdmin.fieldsets + (
        ('Profile', {'fields': ('full_name', 'phone', 'profile_image', 'bio', 'role', 'is_verified')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
    readonly_fields = ('created_at', 'updated_at')
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role', 'is_verified'),
        }),
    )


@admin.register(UserOTP)
class UserOTPAdmin(admin.ModelAdmin):
    list_display = ('user', 'purpose', 'expires_at', 'used_at', 'created_at')
    list_filter = ('purpose', 'used_at', 'created_at')
    search_fields = ('user__email',)
    readonly_fields = ('code_hash', 'created_at')
