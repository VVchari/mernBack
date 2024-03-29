const mongoose = require("mongoose");

const mongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://gofood:X67pL8b1FkAjHHDE@cluster0.muykzil.mongodb.net/goFood");
        console.log("Database Connected");
        const collection = mongoose.connection.db.collection("foodItems");
        const data = await collection.find({}).toArray();
        const foodCategory=mongoose.connection.db.collection("foodCategory");
        const foodCategoryData=await foodCategory.find({}).toArray();
        global.foodItems=data
        global.foodCategory=foodCategoryData
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

module.exports = mongoDB;
