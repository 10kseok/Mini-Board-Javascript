import { AccountEntity } from "src/accounts/account.entity";
import { PostEntity } from "src/posts/post.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    commentId: number;

    @Column()
    content: string;

    @OneToOne(() => PostEntity)
    @JoinColumn({ name : 'post_id' })
    post: PostEntity;

    @OneToOne(() => AccountEntity)
    @JoinColumn({ name : 'account_id' })
    user: AccountEntity;
}