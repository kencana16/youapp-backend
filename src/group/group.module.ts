import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schemas/group.schema';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { ChatModule } from 'src/chat/chat.module';
import { ChatGateway } from 'src/chat/chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),

  ],
  providers: [GroupService],
  controllers: [GroupController],
  exports: [GroupService,],
})
export class GroupModule { }
