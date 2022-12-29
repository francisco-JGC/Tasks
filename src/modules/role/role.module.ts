import { Module } from '@nestjs/common';
import { RoleService } from './service/role.service';
import { RoleController } from './controller/role.controller';

@Module({
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
