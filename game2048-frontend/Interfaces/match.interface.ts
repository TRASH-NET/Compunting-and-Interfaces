import { UUID } from "crypto";

export interface IMatch {
    playerId: UUID;
    score: number;
}

export interface IMatchHistory {
    id: number;
    score: number;
    playerId: UUID;
    matchDate: Date;
}

export interface IRanking {
    id: UUID
    playerName: string;
    bestScore: number;
    lastPlayed: Date;
    rank: number;
}