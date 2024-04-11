import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AccountEntity } from './account.entity';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Public } from 'src/auth/constants';


@Controller('accounts')
export class AccountsController {
    constructor (private accountService: AccountsService) {}

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post()
    signup(@Body() createAccountDto: CreateAccountDto): Promise<AccountEntity> {
        return this.accountService.createAccount(createAccountDto);
    }

    @Get('/:accountId')
    findAccountBy(@Param('accountId') accountId: number): Promise<AccountEntity> {
        return this.accountService.findById(accountId);
    }
}
