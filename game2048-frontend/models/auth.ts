import { IUser } from "@/Interfaces/user.interface";

export const verifyToken = async (token: string) => {
    try {
        const response = await fetch(`${process.env.API_URL}/auth/verify`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
};


export const login = async (user: IUser) => {
    try {
        const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw { status: response.status, message: data.message };
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const register = async (user: IUser) => {
    try {
        const response = await fetch(`${process.env.API_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw { status: response.status, message: data.message };
        }
        return data;
    } catch (error) {
        throw error;
    }
}

export const logout = async (token: string | null) => {
    try {

        if (!token) return;

        const response = await fetch(`${process.env.API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}