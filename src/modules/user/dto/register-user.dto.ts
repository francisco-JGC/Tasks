import { PartialType } from "@nestjs/mapped-types";
import { LoginUserDto } from "./login-user.dto";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto extends PartialType(LoginUserDto) {
    @IsNotEmpty()
    username: string;
}