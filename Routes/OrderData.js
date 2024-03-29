const express=require("express")
const router=express.Router()
const Order=require('../models/Orders')

router.post('/orderData',async(req,res)=>{
    let data = req.body.order_data.slice(); // Clone the array
    let currentDate = new Date();
    let formattedDate = currentDate.toDateString() + ' ' + currentDate.toLocaleTimeString(); // Combine date and time
    data.unshift({ Order_date: formattedDate }); // Add the new item

    let eId=await Order.findOne({'email':req.body.email})
    console.log(eId)
    if(eId===null){
        try{
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        }
        catch(e){
            console.log(e.message)
            res.send("Server Error")

        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
                {$push:{order_data:data}}).then(()=>{
                    res.json({success:true})
                })
        }
            catch(e){
                res.send("Server Error")
            }

        }
    
})

router.post('/myorderData',async(req,res)=>{
    try{
        let myData=await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})
    }
    catch(e){
res.send("server error",e)
    }
})
module.exports=router