import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
    constructor (
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>
    ) {}

    async createAccount(createAccountDto: CreateAccountDto): Promise<AccountEntity> {        
        const {userId, name, password} = createAccountDto;
        const account: AccountEntity = this.accountRepository.create({
            userId,
            name,
            password
        })

        await this.accountRepository.save(account);
        return account;
    }

    async findById(accountId: number): Promise<AccountEntity | undefined> {
        return await this.accountRepository.findOneBy({accountId});
    }

    async findByUserId(userId: string): Promise<AccountEntity | undefined> {
        return await this.accountRepository.findOneBy({userId});
    }
}
