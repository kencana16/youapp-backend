import { Body, Controller, Get, Param, Patch, Post, Req, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { ChatResponseDto } from './dto/chat-response.dto';
import { CreateChatDto } from './dto/create-chat.dto';

@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    // Send a message (private or group)
    @Post()
    @ApiOperation({ summary: 'Send a message (private or group)' })
    @ApiBody({ type: CreateChatDto })
    @ApiResponse({
        status: 201,
        description: 'Message successfully sent',
        type: ChatResponseDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async createMessage(
        @Body() createChatDto: CreateChatDto,
        @Req() request: Request
    ) {
        const userId = request.user?.id; // Access the user ID from request
        if (!userId) {
            throw new UnauthorizedException('User not authenticated');
        }
        return this.chatService.create(createChatDto, userId);
    }

    // Get all messages between two users (private chat)
    @Get('private-chat/:userId1/:userId2')
    @ApiOperation({ summary: 'Get all messages between two users (private chat)' })
    @ApiResponse({
        status: 200,
        description: 'List of messages between two users',
        type: [ChatResponseDto],
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Messages not found' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async getPrivateChat(
        @Param('userId1') userId1: string,
        @Param('userId2') userId2: string,
    ) {
        return this.chatService.findPrivateChat(userId1, userId2);
    }

    // Get messages for a group
    @Get('group/:groupId')
    @ApiOperation({ summary: 'Get messages for a group' })
    @ApiResponse({
        status: 200,
        description: 'List of messages for a group',
        type: [ChatResponseDto],
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Messages not found' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async getGroupMessages(@Param('groupId') groupId: string) {
        return this.chatService.findGroupChat(groupId);
    }

    // Mark a message as read by a user
    @Patch('read/:messageId/:userId')
    @ApiOperation({ summary: 'Mark a message as read by a user' })
    @ApiResponse({
        status: 200,
        description: 'Message marked as read',
        type: ChatResponseDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Message not found' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async markAsRead(@Param('messageId') messageId: string, @Param('userId') userId: string) {
        return this.chatService.markAsRead(messageId, userId);
    }

    // Update a message
    @Patch('update/:messageId')
    @ApiOperation({ summary: 'Update a message' })
    @ApiBody({ description: 'The new message content', type: String })
    @ApiResponse({
        status: 200,
        description: 'Message successfully updated',
        type: ChatResponseDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Message not found' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateMessage(@Param('messageId') messageId: string, @Body('message') newMessage: string) {
        return this.chatService.updateMessage(messageId, newMessage);
    }

    // Soft delete a message
    @Patch('delete/:messageId')
    @ApiOperation({ summary: 'Soft delete a message' })
    @ApiResponse({
        status: 200,
        description: 'Message successfully deleted',
        type: ChatResponseDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Message not found' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async deleteMessage(@Param('messageId') messageId: string) {
        return this.chatService.deleteMessage(messageId);
    }
}
