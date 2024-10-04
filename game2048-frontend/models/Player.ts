import { Player } from "@/Interfaces/player.interface";

export const createPlayer = async (player: Player) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        });

        return response.json();

    } catch (error) {
        throw new Error(`Error creating player: ${error}`);
    }
}

export const getplayers = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, { cache: 'no-store' });
        return response.json();
    } catch (error) {
        throw new Error(`Error fetching players: ${error}`);
    }
}