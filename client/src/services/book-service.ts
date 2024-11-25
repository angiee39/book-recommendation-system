import {resObject} from "@/lib/helpers";

export const getAllBooks = async () => {
    try {
        const res = await fetch( process.env.NEXT_PUBLIC_BASE_URL_SERVER +'api/books/', {
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

export const getBookById = async (id: number) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + `api/books/${id}/`, {
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

export const createBook = async (task: any) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + 'api/books/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
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

export const updateBook = async (task: any) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + `api/books/${task.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
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

export const deleteBook = async (id: number) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + `api/books/${id}/`, {
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
};