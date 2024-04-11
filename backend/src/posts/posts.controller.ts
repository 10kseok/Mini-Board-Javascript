import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import { PostEntity } from './post.entity';

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

    @Get("/:postId")
    readPost(@Param('postId') postId: number): Promise<PostEntity> {
        return this.postsService.findPostBy(postId);
    }

    @Get()
    readAll(): Promise<PostEntity[]> {
        return this.postsService.findAll();
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
