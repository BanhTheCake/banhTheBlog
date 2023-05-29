import { ConfigService } from '@nestjs/config';
import { WebSocketGateway } from '@nestjs/websockets';

// Inject config to WebSocketGateway
function decorateGateway(class_, config: ConfigService) {
  // Just calling the decorator as a function with the class
  // as argument does the same as `@WebSocketGateway`
  WebSocketGateway({
    cors: {
      origin: config.get<string>('CLIENT_URL'),
      credentials: true,
    },
  })(class_);
}

export default decorateGateway;
