import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountEntity } from './account.entity';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';


@Controller('accounts')
export class AccountsController {
    constructor (private accountService: AccountsService) {}

    @Post()
    signup(@Body() createAccountDto: CreateAccountDto): Promise<AccountEntity> {
        return this.accountService.createAccount(createAccountDto);
    }

    @Get('/:accountId')
    findAccountBy(@Param('accountId') accountId: number): Promise<AccountEntity> {
        return this.accountService.findById(accountId);
    }
}
