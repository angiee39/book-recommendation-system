from django.urls import path
from .views.user_views import SignupView, LoginView, LogoutView, UserListView, UserDetailView
from .views.book_views import BookListCreateView, BookDetailView, ReviewListCreateView, ReviewDetailView, CheckReviewExistsView

urlpatterns = [
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:user_id>/', UserDetailView.as_view(), name='user-detail'),
    path('books/', BookListCreateView.as_view(), name='book-list-create'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='book-detail'),
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('reviews/<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),
    path('reviews/check/', CheckReviewExistsView.as_view(), name='check-review-exists'),
]
