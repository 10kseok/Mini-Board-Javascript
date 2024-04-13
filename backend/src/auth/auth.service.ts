import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        private readonly accountsService: AccountsService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(userId: string, pass: string): Promise<any> {
        const account = await this.accountsService.findByUserId(userId);
        if (!account || !await bcrypt.compare(pass, account.password)) {
          throw new UnauthorizedException();
        }
        const payload = { sub: account.userId }
        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
      }
}
