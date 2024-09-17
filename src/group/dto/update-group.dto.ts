import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty({ description: 'The name of the group', required: false })
  @IsString()
  @IsOptional()
  name?: string;
}
