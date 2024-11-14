export interface IJwtPayload {
    id: string;
    playerName: string;
    rank: number | null;
    createdAt: string;
    updatedAt: string;
    iat: number;
    exp: number;
}