import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { SigninRequestDto } from './dto/signin-request.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private readonly accountsService: AccountsService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(userId: string, pass: string): Promise<any> {
        const account = await this.accountsService.findByUserId(userId);
        if (account?.password !== pass) {
          throw new UnauthorizedException();
        }
        const { password, ...result } = account;
        const payload = { sub: account.userId }
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
      }
}
