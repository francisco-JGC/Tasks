import { Entity,Column,PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    description: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    update_at: Date

    @ManyToOne(type => User, user => user.tasks)
    user: User;

}
