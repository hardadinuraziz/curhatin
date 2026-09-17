import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    // Connection established
  }

  handleDisconnect(client: Socket) {
    // Connection terminated
  }

  @SubscribeMessage('session:join')
  handleJoinSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; userId: string },
  ) {
    client.join(data.sessionId);
    client.to(data.sessionId).emit('user:joined', { userId: data.userId });
    return { status: 'joined', sessionId: data.sessionId };
  }

  @SubscribeMessage('session:leave')
  handleLeaveSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; userId: string },
  ) {
    client.leave(data.sessionId);
    client.to(data.sessionId).emit('user:left', { userId: data.userId });
  }

  @SubscribeMessage('message:send')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; senderId: string; content: string },
  ) {
    const saved = await this.chatService.saveMessage(data.sessionId, data.senderId, data.content);
    this.server.to(data.sessionId).emit('message:new', saved);
    return saved;
  }

  @SubscribeMessage('message:read')
  async handleMarkRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; userId: string },
  ) {
    await this.chatService.markAsRead(data.sessionId, data.userId);
    client.to(data.sessionId).emit('message:read_receipt', { sessionId: data.sessionId, readerId: data.userId });
  }

  @SubscribeMessage('typing:start')
  handleTypingStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; userName: string },
  ) {
    client.to(data.sessionId).emit('typing:indicator', { isTyping: true, userName: data.userName });
  }

  @SubscribeMessage('typing:stop')
  handleTypingStop(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; userName: string },
  ) {
    client.to(data.sessionId).emit('typing:indicator', { isTyping: false, userName: data.userName });
  }
}
