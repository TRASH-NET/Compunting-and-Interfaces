import { IMatch } from "@/Interfaces";
import { UUID } from "crypto";

export const saveMatch = async (match: IMatch) => {
    try {
        const response = await fetch(`${process.env.API_URL}/player/save-match`, {
            method: 'POST',
            body: JSON.stringify(match),
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

export const getMatchHistory = async (playerId: UUID | null) => {
    try {
        if (!playerId) {
            return;
        }

        const response = await fetch(`${process.env.API_URL}/player/match-history/${playerId}`, {
            method: 'GET',
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

export const getBestScore = async (playerId: UUID | null) => {
    try {
        if (!playerId) {
            return;
        }

        const response = await fetch(`${process.env.API_URL}/player/best-score/${playerId}`, {
            method: 'GET',
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