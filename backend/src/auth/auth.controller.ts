import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { convertJwtExpiryDateToCookieExpiryDate, jwtConfig } from 'src/configs/jwt.config';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { SigninRequestDto } from './dto/signin-request.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() req : SigninRequestDto, @Res() res: Response) {
        const token = (await this.authService.signIn(req.userId, req.password)).accessToken;
        res.cookie('accessToken', token, {
            expires: convertJwtExpiryDateToCookieExpiryDate(jwtConfig.signOptions.expiresIn)
        });
        return res.send({accessToken : token});
    }
}
