import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PatchUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

	async findOneByProperty(property: string, value: string): Promise<UserDocument> {
		return this.userModel.findOne({ [property]: value }).exec();
	}

	async findByEmail(email: string): Promise<UserDocument> {
		return this.userModel.findOne({ email }).exec();
	}

	async findByUsername(username: string): Promise<UserDocument> {
		return this.userModel.findOne({ username }).exec();
	}

	async findById(userId: string): Promise<UserDocument> {
		return this.userModel.findById(userId).exec();
	}

	async createUser(registerDto: RegisterDto): Promise<UserDocument> {
		const { password, ...userData } = registerDto;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new this.userModel({
			...userData,
			password: hashedPassword,
		});
		return newUser.save();
	}

	async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
		// Directly update the user with the provided data, including null values
		return this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).exec();
	}

	async patchUser(userId: string, patchUserDto: PatchUserDto): Promise<UserDocument> {
		// Find the user first
		const user = await this.userModel.findById(userId).exec();
		if (!user) {
			throw new NotFoundException('User not found');
		}

		// Update only the provided fields
		Object.assign(user, patchUserDto);

		return user.save();
	}


	async updateOnlineStatus(userId: string, isOnline: boolean): Promise<void> {
		await this.userModel.updateOne({ _id: userId }, { isOnline });
	}

	async updateLastSeen(userId: string, lastSeen: Date): Promise<void> {
		await this.userModel.updateOne({ _id: userId }, { lastSeen });
	}
}
