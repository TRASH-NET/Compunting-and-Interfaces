import { IsString, IsStrongPassword, MinLength } from "class-validator";

export class RegisterUserDto {

    @IsString()
    @MinLength(3, {
        message: 'El nombre de usuario debe tener al menos 3 caracteres'
    })
    playerName: string;

    @IsString()
    @IsStrongPassword()
    password: string;
}