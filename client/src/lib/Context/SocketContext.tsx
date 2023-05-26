import { Editor } from '@tiptap/react';
import React, { useContext, useEffect, useMemo } from 'react';
import { Socket } from 'socket.io-client';
import { useDataUser } from '../States/user.state';
import socket from '@/config/socket';

export const SocketContext = React.createContext<Socket | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [user] = useDataUser();

    useEffect(() => {
        if (!user?._id) {
            socket.connected && socket.disconnect();
            return;
        }
        socket.connect();
        return () => {
            socket.disconnect();
        };
    }, [user?._id]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => {
    const socket = useContext(SocketContext);
    if (!socket) throw new Error('You need to wrap <SocketProvider>.');
    return socket;
};

export default SocketProvider;
