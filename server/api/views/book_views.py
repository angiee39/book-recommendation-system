from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..models import Book, Review
from ..serializers.book_serializers import BookSerializer, ReviewSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [SessionAuthentication, JWTAuthentication]

class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    # permission_classes = [IsAuthenticated]

class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    # permission_classes = [IsAuthenticated]

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    # permission_classes = [IsAuthenticated]

class CheckReviewExistsView(APIView):
    def get(self, request):
        book_id = request.query_params.get('book')
        user_id = request.query_params.get('user')

        if not book_id or not user_id:
            return Response(
                {"error": "Missing book or user parameter."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if a review exists
        review_exists = Review.objects.filter(book_id=book_id, user_id=user_id).exists()

        return Response({"exists": review_exists}, status=status.HTTP_200_OK)