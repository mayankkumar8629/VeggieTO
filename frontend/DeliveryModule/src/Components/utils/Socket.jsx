// src/Socket.js
import { io } from "socket.io-client";

const createSocket = () => {
  const token = sessionStorage.getItem("token");
  
  return io("http://localhost:5003", {
    autoConnect: false,
    withCredentials: true,
    transports: ['polling', 'websocket'], 
    upgrade: true,
    rememberUpgrade: false,
    timeout: 20000,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
    maxReconnectionAttempts: 5,
    auth: {
      token: token 
    },
    query: {
      token: token 
    }
  });
};

const Socket = createSocket();

// Function to reconnect socket with fresh token
export const reconnectSocket = () => {
  const token = sessionStorage.getItem("token");
  if (Socket.connected) {
    Socket.disconnect();
  }
  
  // Update auth token
  Socket.auth = { token };
  Socket.io.opts.query = { token };
  
  Socket.connect();
};

// Add global error handling
Socket.on('connect_error', (error) => {
  console.log('Socket connection error:', error.message);
  
  // If authentication error, try to reconnect with fresh token
  if (error.message === 'Authentication error') {
    console.log('Authentication failed, trying to reconnect with fresh token...');
    const token = sessionStorage.getItem("token");
    if (token) {
      setTimeout(() => {
        reconnectSocket();
      }, 2000);
    }
  }
});

Socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
  if (reason === 'io server disconnect') {
    console.log('Server disconnected, attempting manual reconnection...');
    setTimeout(() => {
      if (!Socket.connected) {
        reconnectSocket();
      }
    }, 1000);
  }
  // else the socket will automatically try to reconnect
});

Socket.on('connect', () => {
  console.log('Socket connected with ID:', Socket.id);
});

export default Socket;