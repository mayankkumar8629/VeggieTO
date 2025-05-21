import { subscriber } from "../../../config/redisPubSub.js";
import { notifyAvailableRiders } from "../config/websocket.js";
import Delivery from "../../../UserModel/delivery.model.js";
import Customer from "../../../UserModel/customer.model.js";


export function setupOrderListeners(){
    //suscribing to the chanel
    subscriber.subscribe('order_confirmed');
    //handling the event
    subscriber.on('message',async(channel,message)=>{
        if(channel!=='order_confirmed'){
            return;
        }
        try{
            const {eventId,orderId,userId,items}=JSON.parse(message);
            
            const customer = await Customer.findById(userId);
            if(!customer){
                console.error("Customer not found");
                return;
            }
            //creating a new delivery
            const delivery = new Delivery({
                user:userId,
                order:orderId,
                status:'pending',
                contactNumber:customer.contactNumber,


            });
            await delivery.save();
            const riderNotification = {
                deliveryId:delivery._id,
                orderId:orderId,
                items:items,
                userId:userId,
                address:customer.address,
                createdAt:Date.now()
            };

            const notifiedCount = notifyAvailableRiders('new_delivery',riderNotification);
            console.log(`Notified ${notifiedCount} riders about new delivery`);

        }catch(error){
            console.error("Error processing delivery and rider notification");
        }
    })
}