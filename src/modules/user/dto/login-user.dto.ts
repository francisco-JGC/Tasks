import { IsEmail, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    readonly email: string;

    @MinLength(4)
    @MaxLength(12)
    readonly password: string;
}
