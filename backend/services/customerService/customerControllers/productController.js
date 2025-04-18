import Item from "../../../UserModel/items.model.js";
import redisClient from "../utils/redis.js";

//helper function to fetch from DB and cache in Redis
const fetchItemsAndCache = async(category)=>{
    const items =await Item.find({category:category});
    await redisClient.set(
        `items:category:${category}`,
        items,
        3600
    );
    return items;
}
export const getItemByCategory = async (req, res) => {
    try{
        console.log(req.query);
        const {category}=req.query;
        if(!category){
            return res.status(400).json({message:"Category is required"});
        }
        const cachedItems=await redisClient.get(`items:category:${category}`);
        console.log(typeof cachedItems);

        if(cachedItems){
            return res.status(200).json(cachedItems);
        }
        const items = await fetchItemsAndCache(category);
        if(!items || items.length===0){
            return res.status(404).json({message:"No items found"});
        }
        return res.json(items);
    }catch(error){
        console.error("Error fetching items by category:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}
