const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { SECRETKEY } = require('../keys')
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/requireLogin');
const router = express.Router();


router.post("/signup", (req,res) => {               //first API Call
    const {name,email,password,pic} = req.body      //object discrpting
    if(!email || !name || !password){
        res.status(422).json({error:"Please Add all the Fields"})
        //npm i bcrypt for password ki aage kuch element add ho jaate h 
    }else{
        User.findOne({email:email})
        .then((savedUser) =>{
            if(savedUser){
                res.status(422).json({error:"User Already Exists"})

            }else{
                bcrypt.hash(password,12,)
                .then(hashPassword=>{
                    const user = new User({
                        name,
                        email,
                        password:hashPassword,
                        pic
                    })
                    user.save()
                    .then(user =>{
                        res.status(200).json({msg:"User Added Successfully"})
                    })
                })
            }
        })
    }
})

router.post("/login", (req, res) => {      //Second API Call
    const {email,password} = req.body
    if (!email || !password) {
        return res.status(422).json({error: "Please Add Email and Password "})
    }else{
        User.findOne({email:email})
        .then((savedUser)=>{              //savedUser variable hai 
            if(!savedUser){
                return res.status(422).json({error: "Invalid Email ID !!!!"})
            }else{
                console.log(savedUser)
                    bcrypt.compare(password,savedUser.password)
                    .then(doMatch =>{                        //doMatch variable hai 
                        if(doMatch){
                             const token = jwt.sign({id:savedUser._id},SECRETKEY)
                             return res.json({token})
                        }else{
                            return res.status(422).json({error:"Invalid Password !!!"})
                        }  
                    })
            }
        })
    }
})

router.get("/protected", requireLogin, (req,res) => {      //third API Call
    res.json(req.user) 
})



module.exports = router