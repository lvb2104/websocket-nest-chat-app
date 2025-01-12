/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from '../contexts/WebsocketContext';
import './Websocket.css';

type User = {
    idClient: string | undefined;
    name: string;
    message: string;
};

export const Websocket = () => {
    const [db, setDb] = useState<User[]>([]);
    const [value, setValue] = useState<string>('');
    const [name, setName] = useState<string>('');

    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on('onEvent', (payload: User) => {
            console.log(payload);
            setDb((prevDb) => [...prevDb, payload]);
        });

        return () => {
            console.log('Unregister events ...');
            socket.off('connect');
            socket.off('onEvent');
        };
    }, [socket]);

    function handleClick() {
        if (!value.trim() || !name.trim()) return;

        const newMessage: User = {
            idClient: socket.id,
            name: name,
            message: value,
        };

        socket.emit('newEvent', newMessage);
        setValue('');
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            handleClick();
        }
    }

    return (
        <div className='container'>
            <h1>Chat Application</h1>
            <div className='chat-messages'>
                {db.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${
                            msg.idClient === socket.id ? 'user' : ''
                        }`}
                    >
                        <strong>{msg.name}</strong>
                        <span>{msg.message}</span>
                    </div>
                ))}
            </div>
            <div className='input-area'>
                <input
                    type='text'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Type a message'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleClick}>Send</button>
            </div>
        </div>
    );
};
