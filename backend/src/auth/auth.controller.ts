import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { SigninRequestDto } from './dto/signin-request.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() req: SigninRequestDto, @Res() res: Response) {
        const token = (await this.authService.signIn(req.userId, req.password)).accessToken;
        return res.send({ accessToken: token });
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Get()
    async authenticate(@Query('accessToken') token: string, @Res() res: Response) {
        return res.send({ accessToken: await this.authService.authenticate(token) });
    }
}
