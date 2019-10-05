import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
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

        createdUser.password = await bcrypt.hash(createdUser.password, 10);

        const instance = await createdUser.save();

        return { id: instance.id };
    }

    async findAll(): Promise<User[]> {
        return await this.userModel
            .find()
            .select('-roles -password')
            .exec();
    }

    async findOne(filter: any = {}, withRoles = false): Promise<User> {
        try {
            const query = this.userModel.findOne(filter);

            if (withRoles) {
                query.populate('roles');
            } else {
                query.select('-roles');
            }

            const user = await query.exec();

            return user;
        } catch (err) {
            if (err instanceof mongoose.Error.CastError) {
                throw new NotFoundException();
            }

            throw err;
        }
    }

    async delete(id: string) {
        return await this.userModel.findByIdAndDelete(id).exec();
    }
}
