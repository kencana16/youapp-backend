import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from './schemas/group.schema';
import { ChatGateway } from '../chat/chat.gateway'; // Adjust import path

@Injectable()
export class GroupService {
    constructor(
        @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
        // @Inject(forwardRef(() => ChatGateway)) private readonly chatGateway: ChatGateway // Inject ChatGateway
    ) { }

    // Find groups a user belongs to
    async findUserGroups(userId: string): Promise<string[]> {
        const groups = await this.groupModel.find({ members: userId }).exec();
        return groups.map(group => group.id);
    }

    // Get a group by ID
    async findById(groupId: string): Promise<Group | null> {
        return this.groupModel.findById(groupId).exec();
    }

    // Create a new group
    async create(groupDto: Partial<Group>): Promise<Group> {
        const createdGroup = new this.groupModel(groupDto);
        const savedGroup = await createdGroup.save();

        // Emit group creation event
        // this.chatGateway.server.emit('groupCreated', savedGroup);

        return savedGroup;
    }

    // Update a group
    async update(groupId: string, updateDto: Partial<Group>): Promise<Group | null> {
        const updatedGroup = await this.groupModel.findByIdAndUpdate(groupId, updateDto, { new: true }).exec();

        // Emit group update event
        if (updatedGroup) {
            // this.chatGateway.server.emit('groupUpdated', updatedGroup);
        }

        return updatedGroup;
    }

    // Delete a group
    async delete(groupId: string): Promise<Group | null> {
        const deletedGroup = await this.groupModel.findByIdAndDelete(groupId).exec();

        // Emit group deletion event
        if (deletedGroup) {
            // this.chatGateway.server.emit('groupDeleted', deletedGroup);
        }

        return deletedGroup;
    }

    // Add a user to a group
    async joinGroup(groupId: string, userId: string): Promise<Group | null> {
        const updatedGroup = await this.groupModel.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: userId } },
            { new: true }
        ).exec();

        // Emit group member added event
        if (updatedGroup) {
            // this.chatGateway.server.emit('userJoinedGroup', { groupId, userId });
        }

        return updatedGroup;
    }

    // Remove a user from a group
    async leaveGroup(groupId: string, userId: string): Promise<Group | null> {
        const updatedGroup = await this.groupModel.findByIdAndUpdate(
            groupId,
            { $pull: { members: userId } },
            { new: true }
        ).exec();

        // Emit group member removed event
        if (updatedGroup) {
            // this.chatGateway.server.emit('userLeftGroup', { groupId, userId });
        }

        return updatedGroup;
    }

    async getUserGroups(userId: string): Promise<Group[]> {
        return this.groupModel.find({ members: userId }).exec();
    }
}
