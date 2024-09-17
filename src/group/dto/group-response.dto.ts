import { ApiProperty } from '@nestjs/swagger';

export class GroupResponseDto {
  @ApiProperty({ description: 'The unique identifier of the group' })
  id: string;

  @ApiProperty({ description: 'The name of the group' })
  name: string;

  @ApiProperty({ description: 'The list of member IDs in the group' })
  members: string[];

  @ApiProperty({ description: 'The creation date of the group' })
  createdAt: Date;

  @ApiProperty({ description: 'The last update date of the group' })
  updatedAt: Date;
}
