import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/interfaces/user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async validateUser(login: string, password: string): Promise<User> {
        const user = await this.userService.findOne({ login });

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new BadRequestException('No such login/password pair');
        }

        return user;
    }
}
