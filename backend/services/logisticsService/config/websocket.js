import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path:"../../../.env"});

export const activeConnections = {
    riders: new Map(),
    customers: new Map()
}

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
        console.log("Token:",token);
        if(!token){
            return next(new Error("Authentication error"))
        }
        try{
            const {userId,role}= jwt.verify(token,process.env.JWT_SECRET);
            socket.userId=userId;
            socket.role=role;
            console.log("User ID:",userId);
            console.log("Role:",role);
            
            next();
        }catch(error){
            console.error("Authentication error:",error);
            next(new Error("Authentication error"));
        }
    })
    //connection handler
    io.on('connection',(socket)=>{
       
        const {userId,role}=socket;
        //handling rider connection
        if(role==="rider"){
            activeConnections.riders.set(userId,{
                socket,
                isAvailable:true
            });
            console.log('Rider connected:',userId);
        }
        //handling customer connection
        else if(role==="customer"){
            activeConnections.customers.set(userId,socket);
            console.log('Customer connected:',userId);
        }

        //handling rider availability
        if(role === 'rider'){
            socket.on('set_availability',(available)=>{
                const rider = activeConnections.riders.get(userId);
                if(rider){
                    rider.isAvailable = available;
                    console.log(`Rider ${userId} is now ${available ? 'available' : 'not available'}`);
                }
            });   
        }
        //handling disconnection
        socket.on('disconnect',()=>{
           if(role==="rider"){
                activeConnections.riders.delete(userId);
                console.log("Rider disconnected:",userId);
           }else if(role ==="customer"){
                activeConnections.customers.delete(userId);
                console.log("Customer disconnected:",userId);
           }
        });

    });
}
//function to notify the custome
export function notifyCustomer (customerId,event,data){
    const customerSocket = activeConnections.customers.get(customerId);
    if(customerSocket){
        try{
            customerSocket.emit(event,data);
        }catch(error){
            console.error("Error notifying customer",error);
        }
    }
}

//function to notify all the ridrs
export function notifyAvailableRiders(event,data){
    let count=0;

    activeRiders.forEach((rider)=>{
        if(rider.isAvailable){
            try{
                activeConnections.riders.socket.emit(event,data);
                count++;
            }catch(error){
                console.error("Error notifying rider",error);

            }
        }
    });
    console.log(`Available riders notified :${count}`);
    return count;
}
