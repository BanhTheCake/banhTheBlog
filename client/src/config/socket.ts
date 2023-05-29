import { io, Socket } from 'socket.io-client';
import ENV from './VarEnv';

// please note that the types are reversed
const socket: Socket = io(ENV.socket, {
    withCredentials: true,
    autoConnect: false,
});

export default socket;
