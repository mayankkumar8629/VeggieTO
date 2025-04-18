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
//helper function to fetch the item by id and cache in Redis
const fetchItemAndCache = async(id)=>{
    const item=await Item.findById(id);
    await redisClient.set(
        `item:${id}`,
        item,
        3600
    );
    return item;
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

export const getItemById = async (req, res) => {
    console.log("hi");
    const {id}=req.params;
    try{
         const cachedItem=await redisClient.get(`item:${id}`);
         if(cachedItem){
            return res.status(200).json(cachedItem);
        };
        const item = await fetchItemAndCache(id);  
        if(!item){
            return res.status(404).json({message:"Item not found"});
        }
        return res.status(200).json(item);
    }catch(error){
        console.error("Error fetching item by id:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const searchItems = async (req,res ) =>{
    console.log("hi");
    const {name}=req.query;
    try{
        if(!name || typeof name!=="string"){
            return res.status(400).json({message:"Name is required"});
        }
        console.log(name);
        const searchTerm = name.trim().toLowerCase();

        const cacheKey =  `search:partial:${searchTerm}`;
        const cachedSeachResults = await redisClient.get(cacheKey);

        if(cachedSeachResults){
            return res.status(200).json({
                cached:true,
                results:cachedSeachResults
            });
        }
        //searching in mongodb 
        const items = await Item.find({
            name: {$regex:searchTerm, $options:'i'},
        });

        await redisClient.set(
            cacheKey,
            items,
            300
        );
        return res.status(200).json({
            cached:false,
            results:items
        });
    }catch(error){
        console.error("Error fetching item by id:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}