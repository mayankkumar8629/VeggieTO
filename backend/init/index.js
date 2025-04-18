import connectDB from "../config/db.js";
import items from "./itemData.js";
import Item from "../UserModel/items.model.js";

connectDB();

const seedItems = async () => {
    try {
      // Delete existing items (optional)
      await Item.deleteMany();
      console.log('🗑️ Previous items deleted');
  
      // Insert new items
      const insertedItems = await Item.insertMany(items);
      console.log(`✅ ${insertedItems.length} items added successfully!`);
  
      // Exit process (success)
      process.exit(0);
    } catch (error) {
      console.error('❌ Error seeding items:', error);
      process.exit(1); // Exit with failure
    }
  };
  
  // Run the seed function
  seedItems();