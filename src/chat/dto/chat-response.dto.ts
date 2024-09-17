import { ApiProperty } from '@nestjs/swagger';

export class ChatResponseDto {
    @ApiProperty({ type: String, description: 'Message ID' })
    id: string;

    @ApiProperty({ type: String, description: 'Sender ID' })
    senderId: string;

    @ApiProperty({ type: String, description: 'Recipient ID', required: false })
    recipientId?: string;

    @ApiProperty({ type: String, description: 'Group ID', required: false })
    groupId?: string;

    @ApiProperty({ type: String, description: 'Message content' })
    message: string;

    @ApiProperty({ type: [String], description: 'Array of user IDs who have read the message', required: false })
    readBy?: { userId: string, readAt: Date }[];

    @ApiProperty({ type: Date, description: 'Message creation timestamp' })
    createdAt: Date;

    @ApiProperty({ type: Date, description: 'Message update timestamp', required: false })
    updatedAt?: Date;

    @ApiProperty({ type: Date, description: 'Message deletion timestamp', required: false })
    deletedAt?: Date;
}
