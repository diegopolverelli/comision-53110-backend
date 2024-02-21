const Router =require("express").Router

// const express=require("express")
// const router=express.Router()

const router=Router()


router.get("/" ,(req, res)=>{


    res.status(200).json({
        users:"usuarios"
    })
})

router.post("/", (req, res)=>{

    res.status(201).json({
        users:"usuario post OK...!!!"
    })
})





module.exports=router