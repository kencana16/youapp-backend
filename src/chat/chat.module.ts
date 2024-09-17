import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { UserModule } from 'src/user/user.module';
import { GroupModule } from 'src/group/group.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    AuthModule,
    UserModule,
    GroupModule
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule { }
