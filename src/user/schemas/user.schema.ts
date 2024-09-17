import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getZodiac, getHoroscope } from 'src/utils/get-zodiac';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    photoUrl: string;

    @Prop()
    name: string;

    @Prop()
    birthday: Date;

    @Prop()
    horoscope: string;

    @Prop()
    zodiac: string;

    @Prop()
    height: number;

    @Prop()
    weight: number;

    @Prop([String])
    interests: string[];

    @Prop({ default: false })
    isOnline: boolean;

    @Prop()
    lastSeen: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Pre-save hook to update zodiac and horoscope
UserSchema.pre('save', function (next) {
    if (this.isModified('birthday')) {
        const birthday = new Date(this.birthday);
        this.zodiac = getZodiac(birthday); // Calculate zodiac based on birthday
        this.horoscope = getHoroscope(birthday); // Calculate horoscope based on birthday
    }
    next();
});

// Remove sensitive fields from the response automatically
UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;  // remove password
        delete ret.__v;       // remove version key

        return Object.fromEntries(Object.entries(ret).map(([key, value]) => {
            // Transform the _id to id 
            if (key === '_id') return ['id', value];
            return [key, value];
        }));
    }
});

UserSchema.set('toObject', {
    transform: function (doc, ret, options) {
        delete ret.password;  // remove password
        delete ret.__v;       // remove version key

        return Object.fromEntries(Object.entries(ret).map(([key, value]) => {
            // Transform the _id to id 
            if (key === '_id') return ['id', value];
            return [key, value];
        }));
    }
});
