import { IsEmpty } from "class-validator";

export class CreateRoleDto {
    @IsEmpty()
    name: string;
}
