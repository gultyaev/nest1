import { IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {
    @IsString()
    @MinLength(4)
    login: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @MinLength(3)
    password: string;
}
