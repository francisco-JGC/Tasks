import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { RoleService } from './modules/role/service/role.service';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'chico007321',
      database: 'tasks',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Role, User]),
    UserModule,
    AuthModule,
    RoleModule,
    ],
  controllers: [],
  providers: [RoleService],
})
export class AppModule {}
