import { IsString } from "class-validator";

export class LoginUserDto {

    @IsString()
    playerName: string;

    @IsString()
    password: string;
}