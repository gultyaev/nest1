import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly users: UsersService,
    ) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log('id', id);
        return this.users.findOne(id);
    }

    @Get()
    findAll() {
        return this.users.findAll();
    }

    @Post()
    create(@Body() createUserDto: UserDto): Promise<{id: string}> {
        return this.users.create(createUserDto);
    }
}
