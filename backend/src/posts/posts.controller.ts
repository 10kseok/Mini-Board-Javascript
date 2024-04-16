import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, HttpCode } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import { PostEntity } from './post.entity';
import { PostDetail } from './dto/post-detail.dto';
import { Public } from 'src/auth/constants';

@Controller('posts')
export class PostsController {
    constructor (
        private readonly postsService: PostsService,
        private readonly accountService: AccountsService,
        private readonly jwtService: JwtService,
    ) {}

    @Post('/post')
    writePost(@Body() createPostDto: CreatePostDto, @Req() req: Request): Promise<number> {
        const token = this.extractTokenFromHeader(req);
        const userId = this.jwtService.decode(token).sub;
        const account = this.accountService.findByUserId(userId);
        return this.postsService.createPost(createPostDto, account);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('/post/:postId')
    deletePost(@Param('postId') postId: number): Promise<void> {
        return this.postsService.removePost(postId);
    }
    
    @Public()
    @Get("/:postId")
    async readPost(@Param('postId') postId: number): Promise<PostDetail> {
        return PostEntity.convertToDetail(await this.postsService.findPostBy(postId));
    }

    @Public()
    @Get()
    async readAll(): Promise<PostDetail[]> {
        const posts = await this.postsService.findAll();
        return await posts.map(post => PostEntity.convertToDetail(post));
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
