import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/accounts/account.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    constructor (
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ) {}

    async findPostBy(postId: number): Promise<PostEntity> {
        return await this.postRepository.findOneBy({postId});
    }

    async findAll(): Promise<PostEntity[]> {
        return await this.postRepository.find();
    }

    async createPost(createPostDto: CreatePostDto, account: Promise<AccountEntity>): Promise<number> {
        const {title, content} = createPostDto;
        const post: PostEntity = this.postRepository.create({
            title,
            content
        });
        post.user = await account;
        return (await this.postRepository.save(post)).postId;
    }
    
    async updatePost(updatePostDto: UpdatePostDto, postId: number): Promise<number> {
        const {title, content} = updatePostDto;
        const post: PostEntity = await this.postRepository.findOneBy({postId});
        if (!post) {
            throw new NotFoundException(`Post (postId:${postId}) not found`);
        }
        post.title = title;
        post.content = content;
        return (await this.postRepository.save(post)).postId;
    }

    async removePost(postId: number) {
        this.postRepository.delete({postId});
    }
}
