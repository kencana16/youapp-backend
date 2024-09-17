import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
    @ApiProperty({ description: 'The name of the group' })
    @IsString()
    @IsNotEmpty()
    name: string;
}