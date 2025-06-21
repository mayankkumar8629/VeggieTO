import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path:"../../../.env"});

export const activeConnections = {
    riders: new Map(),
    customers: new Map(),
    deliveryPartners: new Map(),
    farmers: new Map()
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
        }else if(role ==="delivery-partner"){
            activeConnections.deliveryPartners.set(id,{
                socket,
                isAvailable:true
            });
            console.log("Delivery Partner connected:",id);
        }else if(role==="farmer"){
            activeConnections.farmers.set(id,socket);
            console.log("Farmer connected:",id);
        }

        //handling avalablity of riders and delivery partners
        if(role === "rider" || role === "delivery-partner"){
            socket.on('set_availability',(available)=>{
                
                const connectionMap = role==='rider'
                ?activeConnections.riders     
                :activeConnections.deliveryPartners;

                const user= connectionMap.get(id);
                if(user){
                    user.isAvailable=available;
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
           }else if(role === "delivery-partner"){
                activeConnections.deliveryPartners.delete(id);
                console.log("Delivery Partner :",id);
           }
        });

    });
}
//function to notify the customer
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
//function to notify all the farmers
export function notifyFarmers(farmerId,event,data){
    const farmerSocket=activeConnections.farmers.get(farmerId);
    if(farmerSocket){
        try{
            farmerSocket.emit(event,data);
        }catch(error){
            console.error("Error notifying farmer",error);
        }
    }
}
//function to notify all the ridrs
export function notifyAvailableRiders(event,data){
    let count=0;

    activeConnections.riders.forEach((rider)=>{
        if(rider.isAvailable){
            try{
                rider.socket.emit(event,data)
                count++;
            }catch(error){
                console.error("Error notifying rider",error);
            }
        }
    })
    return count;
}

//functin to notify all the delivery partners
export function notifyAvailableDeliveryPartners(event,data){
    let notifiedCount=0;
    activeConnections.deliveryPartners.forEach((partner)=>{
        if(partner.isAvailable){
            partner.socket.emit(event,data);
            notifiedCount++
        }
    });
    console.log(`Notified Count is: ${notifiedCount}`);
    return notifiedCount;
}

