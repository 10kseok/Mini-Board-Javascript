import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/auth/constants';

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
            password: await bcrypt.hash(password, saltOrRounds)
        });
        try {
            await this.accountRepository.save(account);
        } catch {
            throw new BadRequestException();
        }
        return account;
    }

    async findById(accountId: number): Promise<AccountEntity | undefined> {
        return await this.accountRepository.findOneBy({accountId});
    }

    async findByUserId(userId: string): Promise<AccountEntity | undefined> {
        return await this.accountRepository.findOneBy({userId});
    }
}
