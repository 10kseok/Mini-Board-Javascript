import { PostEntity } from "src/posts/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('accounts')
export class AccountEntity {
    @PrimaryGeneratedColumn()
    accountId: number;

    @Column({unique: true})
    userId: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: Promise<PostEntity[]>;
}