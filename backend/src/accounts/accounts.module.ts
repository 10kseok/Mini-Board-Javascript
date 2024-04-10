import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity]), ],
    exports: [TypeOrmModule, AccountsService],
    controllers: [AccountsController],
    providers: [AccountsService]
})
export class AccountsModule {}
