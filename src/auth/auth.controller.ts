import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../users/interfaces/user.interface';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    login(@Body() authDto: AuthDto): Promise<User> {
        return this.authService.validateUser(authDto.login, authDto.password);
    }
}
