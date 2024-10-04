export interface Player {
    playerName: string;
    score: number;
}

export interface PlayerSaved {
    playerId: number;
    playerName: string;
    rank: number;
    score: number;
    lastPlayed: Date;
}