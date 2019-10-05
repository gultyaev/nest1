import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/interfaces/user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async validateUser(login: string, password: string): Promise<User> {
        const user = await this.userService.findOne({ login });

        if (!user) {
            throw new NotFoundException('No such login/password pair');
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new NotFoundException('No such login/password pair');
        }

        return user;
    }
}
