import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }
    async register(registerDto: RegisterDto): Promise<any> {
        // Check if email or username already exists
        const existingUserByEmail = await this.userService.findByEmail(registerDto.email);
        if (existingUserByEmail) {
            throw new ConflictException('Email is already registered.');
        }

        const existingUserByUsername = await this.userService.findByUsername(registerDto.username);
        if (existingUserByUsername) {
            throw new ConflictException('Username is already taken.');
        }

        // If no duplicate, create the new user
        const newUser = await this.userService.createUser(registerDto);

        const payload = { username: newUser.username, sub: newUser._id };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
        });

        // Remove fields you don't want to return in the response
        const { password, _id, __v, ...userResponse } = newUser.toObject();

        return {
            accessToken,
            refreshToken,
            user: userResponse,
        };
    }

    async login(loginDto: LoginDto) {
        const { emailOrUsername, password } = loginDto;
        const user = await this.validateUser(emailOrUsername, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.username, sub: user._id };

        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshAccessToken(refreshToken: string) {
        try {
            const user = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('JWT_SECRET'),
            });
            const payload = { username: user.username, sub: user._id };
            const newAccessToken = this.jwtService.sign(payload);
            const newRefreshToken = this.jwtService.sign(payload, {
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
            });

            return {
                newAccessToken,
                newRefreshToken,
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    private async validateUser(emailOrUsername: string, password: string): Promise<any> {
        let user = await this.userService.findByEmail(emailOrUsername);

        if (!user) {
            user = await this.userService.findByUsername(emailOrUsername);
        }

        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
}
