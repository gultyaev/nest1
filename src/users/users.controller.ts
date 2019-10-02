import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly users: UsersService) {}

    @Get()
    findAll() {
        return this.users.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        if (!id) {
            return this.users.findAll();
        }

        return this.users.findOne(id);
    }

    @Post()
    create(@Body() createUserDto: UserDto): Promise<{ id: string }> {
        return this.users.create(createUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.users.delete(id);
    }
}
