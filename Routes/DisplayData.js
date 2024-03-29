const express=require("express")
const router=express.Router()

router.post('/foodData',(req,res)=>{
    try{
res.send([global.foodItems,global.foodCategory])
    }
    catch(e){
console.e(e.message)
res.send("Server Error")
    }
})

module.exports=router