export interface IJwtPayload {
    id: string;
    playerName: string;
    rank: number | null;
    bestScore: number;
    createdAt: string;
    updatedAt: string;
    iat: number;
    exp: number;
}