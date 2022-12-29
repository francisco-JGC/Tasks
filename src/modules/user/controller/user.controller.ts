import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}   

    @Get('find/:id')
    async findOne(@Param('id') id: number) {
        return await this.userService.findUserById(id);
    }
 
    @Get('find/username/:username')
    async findOneByUsername(@Param('username') username: string) {
        return await this.userService.findUserByUsername(username);
    }

    @Get('find/email/:email')
    async findOneByEmail(@Param('email') email: string) {
        return await this.userService.findUserByEmail(email);
    }

    @Patch('update/:id')
    async update(@Param('id') id: number, @Body() userObject: any) {
        // check if body is empty
        if (Object.keys(userObject).length === 0) throw new HttpException('Body cannot be empty', 400);

        // check if the password is valid length
        if (userObject.password.length < 4) throw new HttpException('Password must be at least 4 characters', 400);

        return await this.userService.updateUser(id, userObject);
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number) {
        return await this.userService.deleteUser(id);
    }
}