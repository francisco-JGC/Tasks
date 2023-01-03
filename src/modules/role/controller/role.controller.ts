import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('assign-role-to-user')
  async assignRoleToUser(@Body() body: any) {
    const { userId, roleId } = body;
    return await this.roleService.assignRoleToUser(userId, roleId);
  }

  @Post('remove-role-from-user')
  async removeRoleFromUser(@Body() body: any) {
    const { userId, roleId } = body;
    return await this.roleService.removeRoleFromUser(userId, roleId);
  }
}
