import {resObject} from "@/lib/helpers";
import {User} from "../types/User";

export const loginUser = async (credentials: User) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + 'api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            // credentials: 'include',
        });

        if (!res.ok) {
            return resObject(false);
        }

        const data = await res.json();
        return resObject(true, data);
    } catch (error) {
        console.error('Error during login:', error);
        return resObject(false);
    }
};

export const logoutUser = async () => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + 'api/auth/logout/', {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (res.ok) {
            return resObject(true)
        } else {
            return resObject(false)
        }
    } catch (error) {
        return resObject(false)
    }
};

export const signUp = async (user: User) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + `api/auth/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
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
