import {resObject} from "@/lib/helpers";
import {Review} from "../types/Review";

export const getAllReviews = async () => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + 'api/reviews/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // credentials: 'include',
        });
        if (!res.ok) {
            return resObject(false);
        }
        const data = await res.json();
        return resObject(true, data);
    } catch (error) {
        return resObject(false)
    }
};

export const checkReviewExists  = async ({book, user}: { book: number; user: number }) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + `api/reviews/check?book=${book}&user=${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // credentials: 'include',
        });
        console.log(res)
        if (!res.ok) {
            return resObject(false);
        }
        const data = await res.json();
        return resObject(true, data);
    } catch (error) {
        return resObject(false)
    }
};

// Create a new review
export const createReview = async (review: { book: number; rating: number; comment: string; user: number }) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + 'api/reviews/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
            // credentials: 'include',
        });
        if (!res.ok) {
            return resObject(false);
        }
        const data = await res.json();
        return resObject(true, data);
    } catch (error) {
        return resObject(false)
    }
}

// Update a review
export const updateReview = async (review: Review) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + `api/reviews/${review.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
            // credentials: 'include',
        });
        if (!res.ok) {
            return resObject(false);
        }
        const data = await res.json();
        return resObject(true, data);
    } catch (error) {
        return resObject(false)
    }
}

// Delete a review
export const deleteReview = async (id: number) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + `api/reviews/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            // credentials: 'include',
        });
        if (!res.ok) {
            return resObject(false);
        }
        return resObject(true);
    } catch (error) {
        return resObject(false)
    }
}