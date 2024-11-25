import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

// Create User Context
const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Load user data from cookies on mount
        const storedUser = Cookies.get('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const setUserInCookie = (userData) => {
        // Store user data as a stringified JSON in the cookie
        Cookies.set('user', JSON.stringify(userData), { secure: true, sameSite: 'Strict', expires: 7 });
    };

    const updateUser = (newUserData) => {
        setUser(newUserData);
        setUserInCookie(newUserData);
    };

    return (
        <UserContext.Provider value={{ user, setUser: updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
