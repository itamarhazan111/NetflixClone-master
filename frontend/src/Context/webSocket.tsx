import { createContext, useState} from 'react';
import  useWebSocket  from 'react-use-websocket'; // Assuming you've installed react-use-websocket (npm install react-use-websocket)

interface WebSocketState {
  sendMessage: (message: string) => void;
}

export const WebSocketContext = createContext<WebSocketState | null>(null);

export const WebSocketProvider= ({ children }:any) => {
  const [url] = useState<string>('wws://netflix-clone-master-two.vercel.app/:3001'); // Replace with your server URL

  const {sendMessage} = useWebSocket(url);

  return (
    <WebSocketContext.Provider value={{ sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

