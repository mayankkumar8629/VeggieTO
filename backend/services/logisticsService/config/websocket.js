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
            const {id,role}= jwt.verify(token,process.env.JWT_SECRET);
            socket.id=id;
            socket.role=role;
            console.log("User ID:",id);
            console.log("Role:",role);
            
            next();
        }catch(error){
            console.error("Authentication error:",error);
            next(new Error("Authentication error"));
        }
    })
    //connection handler
    io.on('connection',(socket)=>{
       
        const {id,role}=socket;
        //handling rider connection
        if(role==="rider"){
            activeConnections.riders.set(id,{
                socket,
                isAvailable:true
            });
            console.log('Rider connected:',id);
        }
        //handling customer connection
        else if(role==="customer"){
            activeConnections.customers.set(id,socket);
            console.log('Customer connected:',id);
        }

        //handling rider availability
        if(role === 'rider'){
            socket.on('set_availability',(available)=>{
                const rider = activeConnections.riders.get(id);
                if(rider){
                    rider.isAvailable = available;
                    console.log(`Rider ${id} is now ${available ? 'available' : 'not available'}`);
                }
            });   
        }
        //handling disconnection
        socket.on('disconnect',()=>{
           if(role==="rider"){
                activeConnections.riders.delete(id);
                console.log("Rider disconnected:",id);
           }else if(role ==="customer"){
                activeConnections.customers.delete(id);
                console.log("Customer disconnected:",id);
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
