import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from 'src/modules/user/service/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}
    
    @Post('login')
    async login(@Body() userObject: any) {
        return await this.userService.login(userObject);
    }
}