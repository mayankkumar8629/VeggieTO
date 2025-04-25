import Queue from "bull";
import { createBullRedisClient } from "./redis-bull.js"; 
import Order from "../../../UserModel/order.model.js";
import Item from "../../../UserModel/items.model.js";

const orderQueue = new Queue('order expiration', {
    createClient:createBullRedisClient
  });

orderQueue.process(async(job)=>{
    const {orderId}=job.data;
    const order = await Order.findById(orderId);

    if(!order || order.status !=='pending'){
        return;
    }

    await Item.bulkWrite(
        order.items.map(item => ({
          updateOne: {
            filter: { _id: item.itemId },
            update: { $inc: { stock: item.quantity } }
          }
        }))
    );

    await Order.updateOne(
        { _id: orderId },
        { status: 'cancelled' }
    );
})

export default orderQueue;

