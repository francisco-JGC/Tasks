import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}   

    @Post('create')
    async create(@Body() userObject: any) {
        // check if body is empty
        if (Object.keys(userObject).length === 0) throw new HttpException('Body cannot be empty', 400);

        // check if the password is valid length
        if (userObject.password.length < 4) throw new HttpException('Password must be at least 4 characters', 400);

        return await this.userService.createUser(userObject);
    }
}
