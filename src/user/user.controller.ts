import { Body, Controller, Get, Patch, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { PatchUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('profile')
    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved user profile',
        type: UserResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async getProfile(@Req() req) {
        return this.userService.findById(req.user.userId);
    }

    @Put('profile')
    @ApiOperation({ summary: 'Update user profile' })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({
        status: 200,
        description: 'Successfully updated user profile',
        type: UserResponseDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - Invalid data',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateProfile(@Req() req, @Body() updateData: UpdateUserDto) {
        return this.userService.updateUser(req.user.userId, updateData);
    }

    @Patch('profile')
    @ApiOperation({ summary: 'Patch user profile' })
    @ApiBody({ type: PatchUserDto })
    @ApiResponse({
        status: 200,
        description: 'Successfully patched user profile',
        type: UserResponseDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - Invalid data',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async patchProfile(@Req() req, @Body() updateData: PatchUserDto) {
        return this.userService.patchUser(req.user.userId, updateData);
    }
}
