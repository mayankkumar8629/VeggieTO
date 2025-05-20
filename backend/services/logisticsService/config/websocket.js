import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path:"../../../.env"});

const activeRiders = new Map();

export function initSocket(server){
    const io = new Server(server);

    //authentication middleware
    io.use((socket,next)=>{
        const token = socket.handshake.auth.token;
        if(!token){
            return next(new Error('Authentication error'));
        }
        try{
            const {riderId}=jwt.verify(token,process.env.JWT_SECRET);
            socket.riderId = riderId;
            next();
        }catch(err){
            next(new Error('Authentication error'));
        }
    });
    //connection handler
    io.on('connection',(socket)=>{
        console.log('Rider connected: ${socket.riderId}');
        //storing the new connection in the map and marking it as available by default
        activeRiders.set(socket.riderId,{
            socket,
            isAvailable:true
        });

        //handling rider availability
        socket.on('set_availability',(available)=>{
            if(rider){
                rider.isAvailable=available;
                console.log('Rider ${socket.riderId} availability:${available}');
            }
        });
        //handling disconnection
        socket.on('disconnect',()=>{
            activeRiders.delete(socket.riderId);
            console.log('Rider disconnected: ${socket.riderId}');
        });

    });
}

//function to notify all the ridrs
export function notifyAvailableRiders(event,data){
    let count=0;

    activeRiders.forEach((rider)=>{
        if(rider.isAvailable){
            try{
                rider.socket.emit(event,data);
                count++;
            }catch(error){
                console.error("Error notifying rider",error);

            }
        }
    });
    console.log(`Available riders notified :${count}`);
    return count;
}