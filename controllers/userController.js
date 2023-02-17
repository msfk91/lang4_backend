//require("dotenv").config()

const User = require('../models/userModel')
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

const createToken =(_id) => {
    console.log(process.env.SECRET)
    console.log(_id)
    return jwt.sign({_id }, process.env.SECRET, {expiresIn: "3d"} ) 
}

//all users
const getUsers= async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}

//single user
const getUser= async(req,res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(404).json({error: "No such account"})
    }
    
    const user = await User.findById(id)

    if (!user){
        return res.status(404).json({error: "No such account"})
    }

    res.status(200).json(user)
}

const signIn= async (req,res) => {
    const {email, password} = req.body
    try{
        const user = await User.signIn(email, password)

        // create a token
        const token = createToken(user._id)    
        console.log(token) 
        res.status(200).json({
            message:"User signed in.",
            status: "success",
            token: token,
            user
        })
    } catch(error){
        res.json({
            message: error.message,
            status: "error"
        })
    }
        
}
//create new user
const createUser = async (req, res)=>{
    const {name, username, email, password} = req.body
    try{
        const user = await User.createAccount(name, 
            username, email, password)

        // create a token
        const token = createToken(user._id)  
        res.status(200).json({
            message:"Account created. Please sign in now.",
            status: "success",
            token: token,
            user
        })
    } catch(error){
        res.json({
            message: error.message,
            status: "error"
        })
    }
}


//delete user
const deleteUser = async (req, res) =>{
    const {id} = req.params


    if (!mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(404).json({error: "No such account"})
    }
    
    const user = await User.findOneAndDelete({_id: id})
    
    if (!user){
        return res.status(404).json({error: "No such account"})
    }

    res.status(200).json(user)
}

// update user
const updateUser = async (req, res) =>{
    const {id} =req.params

    if (!mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(404).json({error: "No such account"})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user){
        return res.status(404).json({error: "No such account"})
    }

    res.status(200).json(user)
}

module.exports= { 
    getUsers,
    getUser,
    signIn,
    createUser,
    deleteUser,
    updateUser
}