import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

}
