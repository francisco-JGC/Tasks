import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { LoginUserDto } from 'src/modules/user/dto/login-user.dto';
import { RegisterUserDto } from 'src/modules/user/dto/register-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User> ) {}

    async login( userObject: LoginUserDto ): Promise<User | {}> {
        
        const { email, password } = userObject;

        // check if the user exists
        const findUser = await this.userRepo.findOne({
            where: { email },
            select: ['id', 'username', 'email', 'password', 'authStrategy', ]
        });
        if (!findUser) throw new HttpException('Credential is incorrect', 400);

        // check if the password is correct
        const isPasswordCorrect = await compare(password, findUser.password);
        if (!isPasswordCorrect) throw new HttpException('Credential is incorrect', 400);

        // return the user object
        return findUser;
    }

    async register( userObject: RegisterUserDto ): Promise<User>{
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

        // create a new user object
        const user = this.userRepo.create(userObject);

        // save the user object to the database
        return await this.userRepo.save(user) as User;
    }
}
