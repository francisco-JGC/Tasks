import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User> ) {}

    async createUser( userObject: RegisterUserDto ): Promise<User>{
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

    async findUserById( id: number ): Promise<User> {
        // findOneBy is a custom method
        const user = await this.userRepo.findOneBy({ id }); 
        return user ? user : null;
    }

    async findUserByUsername( username: string ): Promise<User> {
        // findOneBy is a custom method
        const user = await this.userRepo.findOneBy({ username });
        return user ? user : null;
    }

    async findUserByEmail( email: string ): Promise<User> {
        // findOneBy is a custom method
        const user = await this.userRepo.findOneBy({ email });
        return user ? user : null;
    }
    
}
