import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/modules/auth/jwt.constants';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard]
})
export class AuthModule {}
