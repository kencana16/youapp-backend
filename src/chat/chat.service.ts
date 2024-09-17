import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatGateway } from '../chat/chat.gateway';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
        private readonly chatGateway: ChatGateway,
    ) { }

    // Create a new message
    async create(createChatDto: CreateChatDto, senderId: string): Promise<Chat> {
        const { ...chatData } = createChatDto;
        const createdChat = new this.chatModel({
            senderId: senderId,
            ...chatData,
        });
        const savedChat = await createdChat.save();

        this.chatGateway.handleNewMessage(null, savedChat);

        return savedChat;
    }

    // Get all messages in a private chat between two users
    async findPrivateChat(userId1: string, userId2: string): Promise<Chat[]> {
        return this.chatModel
            .find({
                $or: [
                    { senderId: userId1, recipientId: userId2, deletedAt: null },
                    { senderId: userId2, recipientId: userId1, deletedAt: null },
                ],
            })
            .sort({ createdAt: 1 })
            .exec();
    }

    // Get all messages by group (group chat)
    async findGroupChat(groupId: string): Promise<Chat[]> {
        return this.chatModel.find({ groupId, deletedAt: null }).exec();
    }

    // Mark message as read by a user
    async markAsRead(messageId: string, userId: string): Promise<Chat> {
        const updatedChat = await this.chatModel.findByIdAndUpdate(
            messageId,
            { $push: { readBy: { userId, readAt: new Date() } } },
            { new: true }
        );

        this.chatGateway.handleMessageReaded(null, updatedChat);

        return updatedChat;
    }

    // Update a message
    async updateMessage(messageId: string, newMessage: string): Promise<Chat> {
        const updatedChat = await this.chatModel.findByIdAndUpdate(
            messageId,
            { message: newMessage, updatedAt: new Date() },
            { new: true }
        );

        this.chatGateway.handleMessageUpdated(null, updatedChat);

        return updatedChat;
    }

    // Soft delete a message
    async deleteMessage(messageId: string): Promise<Chat> {
        const deletedChat = await this.chatModel.findByIdAndUpdate(
            messageId,
            { deletedAt: new Date() },
            { new: true }
        );

        this.chatGateway.handleMessageDeleted(null, deletedChat);

        return deletedChat;
    }
}
