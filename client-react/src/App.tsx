import { Websocket } from './components/Websocket';
import { socket, WebsocketProvider } from './contexts/WebsocketContext';

function App() {
    return (
        <>
            <WebsocketProvider value={socket}>
                <Websocket />
            </WebsocketProvider>
        </>
    );
}

export default App;
