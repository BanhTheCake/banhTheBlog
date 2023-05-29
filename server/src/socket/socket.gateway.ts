import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('Gateway init');
  }

  handleConnection(client: Socket) {
    console.log('Connections: ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Disconnections: ', client.id);
  }
}
