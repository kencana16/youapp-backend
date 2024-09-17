import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: [String] })
    members: string[]; // List of user IDs

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);

GroupSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createdAt = new Date();
    }
    this.updatedAt = new Date();
    next();
});

// Remove sensitive fields from the response automatically
GroupSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.__v;       // remove version key

        return Object.fromEntries(Object.entries(ret).map(([key, value]) => {
            // Transform the _id to id 
            if (key === '_id') return ['id', value];
            return [key, value];
        }));
    }
});

GroupSchema.set('toObject', {
    transform: function (doc, ret, options) {
        delete ret.__v;       // remove version key

        return Object.fromEntries(Object.entries(ret).map(([key, value]) => {
            // Transform the _id to id 
            if (key === '_id') return ['id', value];
            return [key, value];
        }));
    }
});