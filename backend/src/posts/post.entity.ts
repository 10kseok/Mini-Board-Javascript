import { AccountEntity } from "src/accounts/account.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn()
    postId: number;

    @ManyToOne(() => AccountEntity)
    @JoinColumn({ name : "account_id"})
    user: AccountEntity;

    @Column()
    title: string;

    @Column()
    content: string;
}