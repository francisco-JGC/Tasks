import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}
      
  @Post('login')
  async login(@Body() userObject: any) {
      // check if body is empty
      if (Object.keys(userObject).length === 0) throw new HttpException('Body cannot be empty', 400);
      
      return await this.userService.login(userObject);
  }

  @Post('register')
  async register(@Body() userObject: any) {
      // check if body is empty
      if (Object.keys(userObject).length === 0) throw new HttpException('Body cannot be empty', 400);

      // check if the password is valid length
      if (userObject.password.length < 4) throw new HttpException('Password must be at least 4 characters', 400);

      return await this.userService.register(userObject);
  }
}
