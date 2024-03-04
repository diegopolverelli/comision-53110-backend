// import { Router } from 'express';
const {Router}=require("express")
// const Router=require("express").Router
// export const router=Router()
const router=Router()

router.get('/',(req,res)=>{


    res.status(200).render('home')
})

router.get('/chat',(req,res)=>{


    res.status(200).render('chat')
})

module.exports=router




