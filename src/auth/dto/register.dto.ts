import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Validate, Length, } from 'class-validator';
import { BaseUserDto } from 'src/user/dto/user.dto';

export class RegisterDto extends BaseUserDto {
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User username',
        example: 'username123',
    })
    @IsString()
    @Length(3, 20)
    username: string;

    @ApiProperty()
    @IsString()
    password: string;
}