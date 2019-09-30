import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
    ) {}

    async create(createUserDto: UserDto): Promise<{ id: string }> {
        const createdUser = new this.userModel(createUserDto);
        const instance = await createdUser.save();

        return { id: instance.id };
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        console.log('find one', id);
        return await this.userModel.findById(id).exec();
    }
}
