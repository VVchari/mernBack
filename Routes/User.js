const express=require("express")
const router=express.Router()
const User=require('../models/User')
const {body,validationResult}=require("express-validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
let jwtSecret="vishnu9908"

router.post('/signup',[body("email").isEmail(),
body("password","Password length is short").isLength({min:5}),
],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const salt=10
    let hashPass=await bcrypt.hash(req.body.password,salt)
    try{
        const existUser=await User.findOne({email:req.body.email})
        if(existUser){
            res.json({msg:false})
        }
        else{
        await User.create({
            name:req.body.name,
            password:hashPass,
            email:req.body.email,
            location:req.body.location
        }).then(res.json({success:true,msg:true}))
    }
    }
    catch(err){
        console.log(err)
        res.json({success:false})
    }

})


router.post('/login',[body("email").isEmail(),
body("password","Password length is short").isLength({min:5}),
],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
  let email=req.body.email
try{
    let userData=await User.findOne({email})
    if(!userData){
        res.json({usermsg:false})
    }
    else{
        const passCompare=await bcrypt.compare(req.body.password,userData.password)
        if(!passCompare){
            res.json({userpass:false})
        }
        else{
            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret)
            res.json({usersucess:true,authToken:authToken})
        }
    }

}
catch(e){
    console.log(e)
    res.json({usersuccess:false})
}

})
module.exports=router