import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; 
import { GroupService } from '../group/group.service'; 

@WebSocketGateway({ cors: true })
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private onlineUsers: Map<string, Socket> = new Map(); // Store user ID to socket mapping
  private userGroups: Map<string, Set<string>> = new Map(); // Store user ID to group IDs

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
  ) { }

  async handleConnection(socket: Socket) {
    const token = socket.handshake.query.token as string;
    if (!token) {
      socket.disconnect();
      return;
    }

    try {
      const decoded = this.jwtService.verify(token);
      const userId = decoded.sub;
      socket.data.userId = userId;
      this.onlineUsers.set(userId, socket);

      // Load user groups
      const groups = await this.groupService.findUserGroups(userId);
      this.userGroups.set(userId, new Set(groups));

      await this.userService.updateOnlineStatus(userId, true);
      console.log(`User ${userId} connected`);
    } catch (err) {
      socket.disconnect();
    }
  }

  async handleDisconnect(socket: Socket) {
    const userId = socket.data.userId;
    if (userId) {
      this.onlineUsers.delete(userId);
      this.userGroups.delete(userId);
      await this.userService.updateOnlineStatus(userId, false);
      await this.userService.updateLastSeen(userId, new Date());
      console.log(`User ${userId} disconnected`);
    }
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(@ConnectedSocket() socket: Socket, payload: any) {
    if (payload.groupId) {
      // Broadcast group message to users in the group
      this.userGroups.forEach((groups, userId) => {
        if (groups.has(payload.groupId)) {
          const userSocket = this.onlineUsers.get(userId);
          if (userSocket) {
            userSocket.emit('newMessage', payload);
          }
        }
      });
    } else {
      // Handle private messages
      const recipientSocket = this.onlineUsers.get(payload.recipientId);
      if (recipientSocket) {
        recipientSocket.emit('newMessage', payload);
      }
    }
  }

  @SubscribeMessage('messageReaded')
  handleMessageReaded(@ConnectedSocket() socket: Socket, payload: any) {
    if (payload.groupId) {
      // Broadcast group message read status to users in the group
      this.userGroups.forEach((groups, userId) => {
        if (groups.has(payload.groupId)) {
          const userSocket = this.onlineUsers.get(userId);
          if (userSocket) {
            userSocket.emit('messageReaded', payload);
          }
        }
      });
    } else {
      // Handle private message read status
      const recipientSocket = this.onlineUsers.get(payload.recipientId);
      if (recipientSocket) {
        recipientSocket.emit('messageReaded', payload);
      }
    }
  }

  @SubscribeMessage('messageUpdated')
  handleMessageUpdated(@ConnectedSocket() socket: Socket, payload: any) {
    if (payload.groupId) {
      // Broadcast group message update to users in the group
      this.userGroups.forEach((groups, userId) => {
        if (groups.has(payload.groupId)) {
          const userSocket = this.onlineUsers.get(userId);
          if (userSocket) {
            userSocket.emit('messageUpdated', payload);
          }
        }
      });
    } else {
      // Handle private message update
      const recipientSocket = this.onlineUsers.get(payload.recipientId);
      if (recipientSocket) {
        recipientSocket.emit('messageUpdated', payload);
      }
    }
  }

  @SubscribeMessage('messageDeleted')
  handleMessageDeleted(@ConnectedSocket() socket: Socket, payload: any) {
    if (payload.groupId) {
      // Broadcast group message deletion to users in the group
      this.userGroups.forEach((groups, userId) => {
        if (groups.has(payload.groupId)) {
          const userSocket = this.onlineUsers.get(userId);
          if (userSocket) {
            userSocket.emit('messageDeleted', payload);
          }
        }
      });
    } else {
      // Handle private message deletion
      const recipientSocket = this.onlineUsers.get(payload.recipientId);
      if (recipientSocket) {
        recipientSocket.emit('messageDeleted', payload);
      }
    }
  }
}
