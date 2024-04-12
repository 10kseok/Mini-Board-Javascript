import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentEntity } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommentEntity]),
        AccountsModule,
        PostsModule,
    ],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule {}
