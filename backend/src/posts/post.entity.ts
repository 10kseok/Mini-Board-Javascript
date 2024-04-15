import { AccountEntity } from "src/accounts/account.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostDetail } from "./dto/post-detail.dto";

@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn()
    postId: number;

    @ManyToOne(() => AccountEntity, {eager: true})
    @JoinColumn({ name : "account_id"})
    user: AccountEntity;

    @Column()
    title: string;

    @Column()
    content: string;

    static convertToDetail(post: PostEntity): PostDetail {
        return {    
          postId: post.postId,
          userId: post.user.userId,
          title: post.title,  
          content: post.content
        };
      }
}