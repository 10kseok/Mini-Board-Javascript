import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { PostsService } from 'src/posts/posts.service';
import { JwtService } from '@nestjs/jwt';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentDetail } from './dto/comment-detail.dto';

@Controller('comments')
export class CommentsController {
    constructor (
        private readonly postsService: PostsService,
        private readonly accountService: AccountsService,
        private readonly commentService: CommentsService,
        private readonly jwtService: JwtService,
    ) {}

    @Post()
    writeComment(@Body() createCommentDto: CreateCommentDto, @Req() req: Request): Promise<number> {
        const token = this.extractTokenFromHeader(req);
        const userId = this.jwtService.decode(token).sub;
        const user = this.accountService.findByUserId(userId);
        const post = this.postsService.findPostBy(createCommentDto.postId);
        return this.commentService.createComment(createCommentDto.content, user, post);
    }

    @Get("/:postId")
    readComment(@Param("postId") postId: number): Promise<CommentDetail[]> {
        return this.commentService.findAllBy(postId);
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
