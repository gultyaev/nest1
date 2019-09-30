import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly users: UsersService,
    ) {}

    @Get()
    findAll() {
        return this.users.findAll();
    }

    @Post()
    create(@Body() createUserDto: UserDto) {
        return this.users.create(createUserDto);
    }
}
