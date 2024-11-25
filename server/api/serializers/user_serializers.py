from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']  # Include password explicitly
        extra_kwargs = {'password': {'write_only': True}}  # Ensure it's write-only

    def create(self, validated_data):
        # Use create_user to hash the password correctly
        password = validated_data.pop('password')  # Extract password
        user = User.objects.create_user(password=password, **validated_data)
        return user