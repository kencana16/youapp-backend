import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateChatDto {

    // @ApiPropertyOptional()
    // @IsOptional()
    // @IsString()
    // senderId: string;      // Sender's user ID

    @ApiPropertyOptional(
        {
            description: 'Recipient user ID for private messages (optional)',
        }
    )
    @IsOptional()
    @IsString()
    recipientId?: string;


    @ApiPropertyOptional(
        {
            description: 'Group ID for group messages (optional)',
        })
    @IsOptional()
    @IsString()
    groupId?: string;

    @ApiProperty(
        {
            description: 'The content of the message',
        })
    @IsString()
    message: string;
}