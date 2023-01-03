import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Task } from './task.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column( { unique: true, nullable: false } )
    email: string;

    @Column({ select: false, nullable: false})
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ nullable: true })
    authStrategy: string;

    @OneToMany(type => Role, role => role.user)
    roles: Role[];

    @OneToMany(type => Task, task => task.user)
    tasks: Task[];
}