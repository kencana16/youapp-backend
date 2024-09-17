import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
    @Prop({ required: true })
    senderId: string;  // The user sending the message

    @Prop({ required: false })
    recipientId?: string;  // For private messaging (optional)

    @Prop({ required: false })
    groupId?: string;  // For group messaging (optional)

    @Prop({ required: true })
    message: string;  // The content of the message

    @Prop({ default: Date.now })
    createdAt: Date;  // When the message was created

    @Prop({ default: null })
    updatedAt: Date;  // When the message was updated

    @Prop({ default: null })
    deletedAt: Date;  // When the message was soft-deleted

    @Prop({ default: [] })
    readBy: { userId: string, readAt: Date }[];  // Array to track users who read the message
}

export const ChatSchema = SchemaFactory.createForClass(Chat);


// Remove sensitive fields from the response automatically
ChatSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.__v;       // remove version key

        return Object.fromEntries(Object.entries(ret).map(([key, value]) => {
            // Transform the _id to id 
            if (key === '_id') return ['id', value];
            return [key, value];
        }));
    }
});

ChatSchema.set('toObject', {
    transform: function (doc, ret, options) {
        delete ret.__v;       // remove version key

        return Object.fromEntries(Object.entries(ret).map(([key, value]) => {
            // Transform the _id to id 
            if (key === '_id') return ['id', value];
            return [key, value];
        }));
    }
});