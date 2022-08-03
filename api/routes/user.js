const express = require("express");
const router = express.Router();
const User = require("../model/user");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserValidation= require("../validation/user_signup");
const {validate} = require('express-validation');
const checkAuth = require("../middleware/check-auth");


// router.get('/',(req,res,next)=>{
//     res.status(200).json({
//         message:'user route working'
//     })
// })

// router.get('/username',(req,res,next)=>{
//     User.find()
//     .then(result=>{
//      res.status(200).json({
//          userData:result.username
//      });
//     })
 
//     .catch(err=>{
//      console.log(err);
//      res.status(500).json({
//          error:err
//      })
//     })
// })


//GET ALL USERS
router.get('/',checkAuth,(req,res,next)=>{
    User.find()
    .then(result=>{
     res.status(200).json({
         UserData:result
     });
    })
 
    .catch(err=>{
     console.log(err);
     res.status(500).json({
         error:err
     })
    })
 })
 

router.post('/signup',validate(UserValidation.createOrUpdateUser),(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else{
            const user = new User({
                _id:new mongoose.Types.ObjectId,
                username:req.body.username,
                password:hash,
                phone:req.body.phone,
                email:req.body.email,
                userType:req.body.userType
            })
            user.save()
            .then(result=>{
                res.status(200).json({
                    userData:result
                });
               })
            
               .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                })
               })
        }

    })
})

router.post('/login',(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:'user not found'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
                return res.status(401).json({
                    message:'password incorrect'
                })
            }
            if(result){
                const token=jwt.sign({
                    username:user[0].username,
                    userType:user[0].userType,
                    email:user[0].email,
                    phone:user[0].phone
                },
                //secret key
                'this is dummy text',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    username:user[0].username,
                    userType:user[0].userType,
                    email:user[0].email,
                    phone:user[0].phone,
                    token:token
                })
            }

        })
    })

    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})


module.exports = router;