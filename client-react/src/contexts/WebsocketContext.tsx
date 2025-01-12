/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

// export const socket = io('http://localhost:9001');
export const socket = io('https://5b3a-171-250-165-8.ngrok-free.app/', {
    transports: ['websocket'], // Use WebSocket transport
});
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;
