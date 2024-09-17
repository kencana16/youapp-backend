import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsArray, IsDateString, IsBoolean, IsDate } from 'class-validator';

export class BaseUserDto {
    @ApiPropertyOptional({
        description: 'User full name',
        example: 'John Doe',
    })
    @IsOptional()
    @IsString()
    name?: string;


    @ApiPropertyOptional({
        description: 'User date of birth',
        example: '1990-01-01T00:00:00Z',
    })
    birthday?: Date;


    @ApiPropertyOptional({
        description: 'User height in centimeters',
        example: 175,
    })
    @IsOptional()
    @IsNumber()
    height?: number;


    @ApiPropertyOptional({
        description: 'User weight in kilograms',
        example: 70,
    })
    @IsOptional()
    @IsNumber()
    weight?: number;


    @ApiPropertyOptional({
        description: 'User interests',
        example: ['reading', 'gaming'],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    interests?: string[];
}

export class UpdateUserDto extends BaseUserDto { }
export class PatchUserDto extends BaseUserDto { }

export class UserResponseDto {
    @ApiProperty({
        description: 'User ID',
        example: '605c72ef1f6477b5d3c5e3a0',
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
    })
    @IsString()
    email: string;

    @ApiProperty({
        description: 'User username',
        example: 'username123',
    })
    @IsString()
    username: string;

    @ApiPropertyOptional({
        description: 'URL of the user profile photo',
        example: 'https://example.com/photo.jpg',
    })
    @IsOptional()
    @IsString()
    photoUrl?: string;

    @ApiPropertyOptional({
        description: 'User full name',
        example: 'John Doe',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        description: 'User date of birth',
        example: '1990-01-01T00:00:00Z',
    })
    @IsOptional()
    @IsDate()
    birthday?: Date;

    @ApiPropertyOptional({
        description: 'User horoscope',
        example: 'Capricorn',
    })
    @IsOptional()
    @IsString()
    horoscope?: string;

    @ApiPropertyOptional({
        description: 'User zodiac sign',
        example: 'Capricorn',
    })
    @IsOptional()
    @IsString()
    zodiac?: string;

    @ApiPropertyOptional({
        description: 'User height in centimeters',
        example: 175,
    })
    @IsOptional()
    @IsNumber()
    height?: number;

    @ApiPropertyOptional({
        description: 'User weight in kilograms',
        example: 70,
    })
    @IsOptional()
    @IsNumber()
    weight?: number;

    @ApiPropertyOptional({
        description: 'User interests',
        example: ['reading', 'gaming'],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    interests?: string[];

    @ApiPropertyOptional({
        description: 'Indicates if the user is online',
        example: false,
    })
    @IsOptional()
    @IsBoolean()
    isOnline?: boolean;

    @ApiPropertyOptional({
        description: 'Last time the user was seen online',
        example: '2024-09-17T12:34:56Z',
    })
    @IsOptional()
    @IsDate()
    lastSeen?: Date;
}
