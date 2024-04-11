import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
    imports: [
      TypeOrmModule.forRoot(typeORMConfig), 
      AccountsModule, 
      AuthModule,
      PostsModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
  constructor (private datasource: DataSource) {}
}
