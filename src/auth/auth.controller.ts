import { Controller, Post, Body, ValidationPipe, UsePipes, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiTags, ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/dto/user.dto';

@ApiTags('Auth (Register & Login)')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', description: 'JWT access token' },
        refreshToken: { type: 'string', description: 'JWT refresh token' },
        user: { $ref: getSchemaPath(UserResponseDto) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login an existing user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', description: 'JWT access token' },
        refreshToken: { type: 'string', description: 'JWT refresh token' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })

  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh access token using a refresh token' })
  @ApiBody({
    description: 'Object containing the refresh token',
    schema: {
      type: 'object',
      properties: {
        refreshToken: {
          type: 'string',
          description: 'The refresh token used to obtain a new access token',
        },
      },
      required: ['refreshToken'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', description: 'New JWT access token' },
        refreshToken: { type: 'string', description: 'New JWT refresh token' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async refresh(@Body() refreshTokenDto: { refreshToken: string }) {
    return this.authService.refreshAccessToken(refreshTokenDto.refreshToken);
  }
}
