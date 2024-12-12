import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server = new Server();

  private logger = new Logger('ChatGateway');

  @SubscribeMessage('chat')
  async handleChatEvent(
    @MessageBody()
    payload: {
      room: string;
      message: string;
      user: string;
    },
  ) {
    this.logger.log(payload);
    this.server.to(payload.room).emit('chat', payload);
    return payload;
  }

  @SubscribeMessage('join_room')
  async handleSetClientDataEvent(
    @MessageBody()
    payload: {
      room: string;
      user: string;
    },
  ) {
    console.log('payload on join room', payload);
    if (payload.user) {
      this.logger.log(`${payload.user} is joining room ${payload.room}`);
      await this.server.in(payload.user).socketsJoin(payload.room);
      console.log('server')
      
      console.log(this.server.listeners('join_room'))
    } else {
        console.log("payload user", payload.user)
    }
  }

  @SubscribeMessage('exchange')
  async handleEnchange(
    @MessageBody()
    payload: {
      userId: string,
      roomName: string,
      publicNumbers: { base: number; prime: number };
      df: {}   
    }
  ){
    console.log(`Exchange key event`);
    if (payload.userId) {
      this.logger.log(payload);
 ;
      // console.log('evento exchange na sala', res)
      this.server.to(payload.roomName).emit('exchange', {...payload});
      return payload;
    }
  }

  async handleConnection(socket: Socket): Promise<void> {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    //await this.userService.removeUserFromAllRooms(socket.id);
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
