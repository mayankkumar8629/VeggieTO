import { io } from 'socket.io-client';

const socket = io('http://localhost:5003',{
    autoConnect: false,
    withCredentials: true,
    transports:['websocket'],
    timeout:20000,
    reconnection: true,
    reconnectionAttempts:5,
    reconnectionDelay: 1000,
    auth:{
        token: sessionStorage.getItem('token')
    },
    query:{
        token: sessionStorage.getItem('token')
    }
});

socket.on('disconnect',()=>{
    console.log('Socket disconnected:', socket.id);
})

export const reconnectSocket = ()=>{
    const token = sessionStorage.getItem('token');
    if(socket.connected){
        socket.disconnect();
    }
    socket.auth = {token};
    socket.io.opts.query ={token};
    socket.connect();
}

socket.on('connect', ()=>{
    console.log('Socket connected:', socket.id);
})

export default socket;