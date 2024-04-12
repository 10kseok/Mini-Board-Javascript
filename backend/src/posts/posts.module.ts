import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity]),
        AccountsModule
    ],
    exports: [PostsService],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule {}
