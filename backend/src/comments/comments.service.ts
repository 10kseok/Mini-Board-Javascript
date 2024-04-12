import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/accounts/account.entity';
import { PostEntity } from 'src/posts/post.entity';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommentDetail } from './dto/comment-detail.dto';

@Injectable()
export class CommentsService {
    constructor (
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>
    ) {}

    async createComment(content: string, user: Promise<AccountEntity>, post: Promise<PostEntity>): Promise<number> {
        const comment: CommentEntity = this.commentRepository.create({
            content
        });
        comment.post = await post;
        comment.user = await user;
        return (await this.commentRepository.save(comment)).commentId;
    }

    async findAllBy(postId: number): Promise<CommentDetail[]> {
        return this.commentRepository.createQueryBuilder('comment')
            .select(['comment_id', 'user_id', 'content'])
            .leftJoin('comment.user', 'accounts')
            .where('post_id = :postId', {postId})
            .execute();
    }
}
