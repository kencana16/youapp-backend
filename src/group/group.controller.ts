import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UsePipes,
    ValidationPipe,
    Req,
    UnauthorizedException
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { GroupResponseDto } from './dto/group-response.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Request } from 'express';
import { Group, GroupDocument } from './schemas/group.schema';

@ApiTags('Groups')
@ApiBearerAuth()
@Controller('groups')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new group' })
    @ApiBody({ type: CreateGroupDto, description: 'Group creation data' })
    @ApiResponse({ status: 201, description: 'The group has been successfully created.', type: GroupResponseDto })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createGroupDto: CreateGroupDto) {
        const group = await this.groupService.create(createGroupDto);
        return group;
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get group details by ID' })
    @ApiParam({ name: 'id', type: String, description: 'The ID of the group' })
    @ApiResponse({ status: 200, description: 'The group details', type: GroupResponseDto })
    @ApiResponse({ status: 404, description: 'Group not found' })
    async findById(@Param('id') id: string) {
        const group = await this.groupService.findById(id);
        return group;
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a group by ID' })
    @ApiParam({ name: 'id', type: String, description: 'The ID of the group to update' })
    @ApiBody({ type: UpdateGroupDto, description: 'Group update data' })
    @ApiResponse({ status: 200, description: 'The updated group details', type: GroupResponseDto })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    @ApiResponse({ status: 404, description: 'Group not found' })
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Param('id') id: string, @Body() updateDto: UpdateGroupDto) {
        const group = await this.groupService.update(id, updateDto);
        return group;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a group by ID' })
    @ApiParam({ name: 'id', type: String, description: 'The ID of the group to delete' })
    @ApiResponse({ status: 200, description: 'The deleted group details', type: GroupResponseDto })
    @ApiResponse({ status: 404, description: 'Group not found' })
    async delete(@Param('id') id: string) {
        const group = await this.groupService.delete(id);
        return group;
    }

    @Post(':groupId/join')
    @ApiOperation({ summary: 'Join a group' })
    @ApiParam({ name: 'groupId', type: String, description: 'The ID of the group to join' })
    @ApiResponse({ status: 200, description: 'The updated group details', type: GroupResponseDto })
    @ApiResponse({ status: 404, description: 'Group not found' })
    async joinGroup(
        @Param('groupId') groupId: string,
        @Req() request: Request
    ) {
        const userId = request.user?.id; // Access the user ID from request
        if (!userId) {
            throw new UnauthorizedException('User not authenticated');
        }
        const group = await this.groupService.joinGroup(groupId, userId);
        return group;
    }

    @Post(':groupId/leave')
    @ApiOperation({ summary: 'Leave a group' })
    @ApiParam({ name: 'groupId', type: String, description: 'The ID of the group to leave' })
    @ApiResponse({ status: 200, description: 'The updated group details', type: GroupResponseDto })
    @ApiResponse({ status: 404, description: 'Group not found' })
    async leaveGroup(
        @Param('groupId') groupId: string,
        @Req() request: Request
    ) {
        const userId = request.user?.id; // Access the user ID from request
        if (!userId) {
            throw new UnauthorizedException('User not authenticated');
        }
        const group = await this.groupService.leaveGroup(groupId, userId);
        return group;
    }


}
