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
//filter items based on price -> asc/desc , min and max price
const filterAndSortItems = (items,{sort,minPrice,maxPrice})=>{
    let filteredItems=items;

    if(minPrice!==undefined || maxPrice!==undefined){
        filteredItems=filteredItems.filter(item => {
            const price = item.price;
            const min = minPrice!==undefined ?  minPrice : 0;
            const max = maxPrice!==undefined? maxPrice :Number.MAX_SAFE_INTEGER;
            return price>=min && price<=max;
        });
    }
    if(sort==="asc"){
        filteredItems=filteredItems.sort((a,b)=>a.price-b.price);
    }else if(sort==="desc"){
        filteredItems=filteredItems.sort((a,b)=>b.price-a.price);
    }
    return filteredItems;
}





export const getItemByCategory = async (req, res) => {
    try{
        console.log(req.query);
        const {category,sort,minPrice,maxPrice}=req.query;
        if(!category){
            return res.status(400).json({message:"Category is required"});
        }
        const cachedItems=await redisClient.get(`items:category:${category}`);
        console.log(typeof cachedItems);
        let items;

        if(cachedItems){
            items=cachedItems
        }else{
            items=await fetchItemsAndCache(category);
            console.log("Items fetched from DB and cached");
        }
        
        if(!items || items.length===0){
            return res.status(404).json({message:"No items found"});
        }
        const hasFilter = sort !== undefined || minPrice !== undefined || maxPrice !== undefined;
        const finalItems = hasFilter
            ? filterAndSortItems(items,{
                sort,
                minPrice:minPrice?Number(minPrice):undefined,
                maxPrice:maxPrice?Number(maxPrice):undefined
            })
            :items;

    
        return res.json(finalItems);
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
    const {name,sort,minPrice,maxPrice}=req.query;
    try{
        if(!name || typeof name!=="string"){
            return res.status(400).json({message:"Name is required"});
        }
        console.log(name);
        const searchTerm = name.trim().toLowerCase();

        const cacheKey =  `search:partial:${searchTerm}`;
        const cachedSeachResults = await redisClient.get(cacheKey);
        let items;

        if(cachedSeachResults){
            items=cachedSeachResults;
            console.log("Items fetched from cache");
        }else{
            items=await Item.find({
                name: {$regex:searchTerm, $options:'i'},
            });
            console.log("Items fetched from DB and cached");
            await redisClient.set(
                cacheKey,
                items,
                300
            );
        }
        if(!items || items.length===0){
            return res.status(404).json({message:"No items found"});
        }
        const hasFilter = sort !== undefined || minPrice !== undefined || maxPrice !== undefined;
        const finalItems = hasFilter
            ? filterAndSortItems(items,{
                sort,
                minPrice:minPrice?Number(minPrice):undefined,
                maxPrice:maxPrice?Number(maxPrice):undefined
            })
            :items;

    
        return res.json(finalItems);
    }catch(error){
        console.error("Error fetching item by id:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}