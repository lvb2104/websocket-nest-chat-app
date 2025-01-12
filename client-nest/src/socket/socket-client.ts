import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class SocketClient implements OnModuleInit {
    public socketClient: Socket;

    constructor() {
        // Connect to the server
        this.socketClient = io('http://localhost:9001');
    }

    // This method is called when the module is initialized by NestJS (OnModuleInit) and it registers the consumer events for the socket client instance to listen to the 'connect' and 'onMessage' events
    onModuleInit() {
        this.registerConsumerEvents();
    }

    private registerConsumerEvents() {
        // listen to 'connect'
        this.socketClient.on('connect', () => {
            console.log('Connected to server');
        });

        // emit 'newEvent'
        // this.socketClient.emit('newEvent', '2. Hello from the client');

        // listen to 'onEvent'
        this.socketClient.on('onEvent', (payload: any) => {
            console.log(payload);
        });
    }
}
