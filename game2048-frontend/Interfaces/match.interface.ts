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