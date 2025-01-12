import { OnModuleInit } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*', // Replace '*' with your Vercel domain for security
        methods: ['GET', 'POST'],
    },
})
export class MyGateway implements OnModuleInit {
    // This decorator will inject the server instance to the gateway class to send messages to the client from the server
    @WebSocketServer()
    server: Server;

    // This method will be called when client connects to the server
    onModuleInit() {
        this.server.on('connect', (socket) => {
            // console.log('ID: ' + socket.id);
            console.log(`Client ${socket.id} connected`);
        });
    }

    // This decorator will listen to the event 'newEvent' from the client side and will handle the event with the handleEvent method
    @SubscribeMessage('newEvent')
    // Flow: Client sends event 'newEvent' -> handler in server subscribed 'newEvent' is called -> handler in server sends event 'onEvent' -> clients listening to event 'onEvent' receive that message
    handleEvent(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
        console.log(`From client ${client.id}: ${body}`);

        // Emit an event to the client side: sent for ALL connected clients that are LISTENING to the 'onEvent' event
        this.server.emit('onEvent', body);
        // this.server.emit('onEvent', `From client ${client.id}: ${body}`);

        // Return the body of the message received from the client side to the client side as a response: sent ONLY to the client that sent the message
        // return body;
    }
}
