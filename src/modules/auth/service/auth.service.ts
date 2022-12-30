import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { LoginUserDto } from 'src/modules/user/dto/login-user.dto';
import { RegisterUserDto } from 'src/modules/user/dto/register-user.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from 'src/modules/role/service/role.service';    

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
        private jetService: JwtService,
        private roleService: RoleService,
    ) {}

    async login( userObject: LoginUserDto ): Promise<{}> {
        
        const { email, password } = userObject;

        // check if the user exists
        const findUser = await this.userRepo.findOne({
            where: { email },
            select: ['id', 'username', 'email', 'password', 'authStrategy'],
            relations: ['roles']
        });
        if (!findUser) throw new HttpException('Credential is incorrect', 400);

        // check if the password is correct
        const isPasswordCorrect = await compare(password, findUser.password);
        if (!isPasswordCorrect) throw new HttpException('Credential is incorrect', 400);

        // create a token
        const payload = { username: findUser.username, sub: findUser.id, roles: findUser.roles };
        const accessToken = this.jetService.sign(payload);
        
        // delete the password from the user object
        delete findUser.password;

        return {
            token: accessToken,
            user: findUser
        };
    }

    async register( userObject: RegisterUserDto): Promise<User>{
        // check if the user already exists
        const userExists = await this.userRepo.findOneBy({ username: userObject.username });
        if (userExists) throw new HttpException('User already exists', 400);

        // check if the email already exists
        const emailExists = await this.userRepo.findOneBy({ email: userObject.email });
        if (emailExists) throw new HttpException('Email already exists', 400);

        // hash the password
        const { password } = userObject;
        const plainToHash = await hash(password, 10);
        userObject = { ...userObject, password: plainToHash };

        // create a new user
        const newUser = this.userRepo.create(userObject);

        // get the default role and assign it to the user
        const defaultRole = await this.roleService.getDefaultRole();
        newUser.roles = [defaultRole];
        return await this.userRepo.save(newUser);
    }
}
