from django.urls import path
from .views.user_views import SignupView, LoginView, LogoutView
from .views.book_views import BookListCreateView, BookDetailView, ReviewListCreateView

urlpatterns = [
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('books/', BookListCreateView.as_view(), name='book-list-create'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='book-detail'),
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
]
