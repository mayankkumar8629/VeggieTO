import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path:"../../../.env"});

export const activeRiders = new Map();

export function initSocket(server){
    const io = new Server(server,{
        cors: {
            origin: "*", // Allow all origins (for development)
            methods: ["GET", "POST"],
            allowedHeaders: ["Authorization"],
            credentials: true
        }
    });

    //authentication middleware
    io.use((socket,next)=>{
        const token = socket.handshake.auth.token;
        if(!token){
            return next(new Error('Authentication error'));
        }
        try{
            const {riderId}=jwt.verify(token,process.env.JWT_SECRET);
            socket.riderId = riderId;
            console.log('Rider authenticated:',riderId);
            next();
        }catch(err){
            next(new Error('Authentication error'));
        }
    });
    //connection handler
    io.on('connection',(socket)=>{
        console.log('Rider connected:',socket.riderId);
        //storing the new connection in the map and marking it as available by default
        activeRiders.set(socket.riderId,{
            socket,
            isAvailable:true
        });
        console.log(activeRiders);

        //handling rider availability
        socket.on('set_availability',(available)=>{
            const rider = activeRiders.get(socket.riderId);
            if(rider){
                rider.isAvailable=available;
                console.log('Rider',socket.riderId,'availability set to',available);
               
                
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
