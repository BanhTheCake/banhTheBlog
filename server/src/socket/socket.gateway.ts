import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('Gateway init');
  }

  handleConnection(client: Socket) {
    // console.log('Connections: ', client.handshake.headers.cookie);
  }

  handleDisconnect(client: Socket) {
    console.log('Disconnections: ', client.id);
  }

  @SubscribeMessage('testSocket')
  findAll(@MessageBody() data: any): any {
    console.log('Socket workkk !: ', data);
  }
}
