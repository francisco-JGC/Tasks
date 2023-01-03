import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ) {}
    
    async init() : Promise<void> {
        const role = await this.roleRepo.findOneBy({ name: 'user' });
        if (!role) {
            const newRole = this.roleRepo.create({ name: 'user' });
            await this.roleRepo.save(newRole);
        }

        const adminRole = await this.roleRepo.findOneBy({ name: 'admin' });
        if (!adminRole) {
            const newRole = this.roleRepo.create({ name: 'admin' });
            await this.roleRepo.save(newRole);
        }

        return;
    }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const { name } = createRoleDto;

        // check if role is empty
        if (!name) throw new HttpException('Role is empty', 400);

        // check if role already exists
        const roleExists = await this.roleRepo.findOneBy({ name});
        if (roleExists) throw new HttpException('Role already exists', 400);

        const role = this.roleRepo.create(createRoleDto);
        return await this.roleRepo.save(role);
    }


    async getDefaultRole(): Promise<Role> {
        return await this.roleRepo.findOneBy({ name: 'user' });
    }

    async removeRoleFromUser(userId: number, roleId: number): Promise<User> {
        const user = await this.userRepo.find({
            where: { id: userId },
            relations: ['roles']
        });
        const role = await this.roleRepo.findOneBy({ id: roleId });

        if (!user) throw new HttpException('User does not exist', 400);
        if (!role) throw new HttpException('Role does not exist', 400);

        const userHasRole = user[0].roles.find(r => r.id === role.id);
        if (!userHasRole) throw new HttpException('User does not have the role', 400);

        user[0].roles = user[0].roles.filter(r => r.id !== role.id);
        return await this.userRepo.save(user[0]);
    }

    async assignRoleToUser(userId: number, roleId: number): Promise<User> {
        const user = await this.userRepo.find({
            where: { id: userId },
            relations: ['roles']
        })
        const role = await this.roleRepo.findOneBy({ id: roleId });

        if (!user) throw new HttpException('User does not exist', 400);
        if (!role) throw new HttpException('Role does not exist', 400);

        const userHasRole = user[0].roles.find(r => r.id === role.id);
        if (userHasRole) throw new HttpException('User already has the role', 400);

        user[0].roles.push(role);
        return await this.userRepo.save(user[0]);
    }
}
