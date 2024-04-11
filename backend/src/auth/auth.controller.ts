import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { SigninRequestDto } from './dto/signin-request.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() req : SigninRequestDto) {
        return this.authService.signIn(req.userId, req.password);
    }
}
