import { io, Socket } from 'socket.io-client';

// please note that the types are reversed
const socket: Socket = io('http://localhost:8080', {
    withCredentials: true,
    autoConnect: false,
});

export default socket;
