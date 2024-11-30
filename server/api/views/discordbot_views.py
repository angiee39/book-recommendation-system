from rest_framework import status, generics
from rest_framework.response import Response
from ..models import User
from ..serializers.user_serializers import UserSerializer

class UserByDiscordIDView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, discord_id):
        try:
            user = User.objects.get(discord_id=discord_id)
            return Response(UserSerializer(user).data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
