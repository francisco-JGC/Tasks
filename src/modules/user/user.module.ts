import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy]
})
export class UserModule {}
