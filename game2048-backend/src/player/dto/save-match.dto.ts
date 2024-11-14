import { IsNumber, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class SaveMatchDto {

    @IsUUID()
    playerId: UUID;

    @IsNumber()
    score: number;
}
