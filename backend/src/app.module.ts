import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { AccountsModule } from './accounts/accounts.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig), 
    AccountsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor (private datasource: DataSource) {}
}
