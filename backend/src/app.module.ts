import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
      TypeOrmModule.forRoot(typeORMConfig), 
      AccountsModule, AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
  constructor (private datasource: DataSource) {}
}
