import {resObject} from "@/lib/helpers";
import {User} from "../types/User";

export const getAllUsers = async () => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + 'api/users/', {
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

export const getUserById = async (id: number) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + `api/users/${id}/`, {
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

// export const createUser = async (user: User) => {
//     try {
//         const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + `api/users/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(user),
//             // credentials: 'include',
//         });
//         if (!res.ok) {
//             return resObject(false);
//         }
//         const data = await res.json();
//         return resObject(true, data);
//     } catch (error) {
//         return resObject(false)
//     }
// };

export const updateUser = async (user: User) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + `api/users/${user.id}/`, {
            method: 'PATCH',
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