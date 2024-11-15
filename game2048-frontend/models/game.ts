export const getRanking = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player/ranking`, {
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