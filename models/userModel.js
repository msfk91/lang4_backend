const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true, 
        unique: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true })

userSchema.statics.createAccount = async function (name, 
    username, email, password){

        // validation
        if (name.toString()=='' || username.toString()=='' || 
        email.toString()=='' || password.toString()==''){
            throw Error("All fields are required.")
        }

        if (!validator.isEmail(email) ){
            throw Error("Email is not valid.")
        }
        if (!validator.isStrongPassword(password)){
            throw Error( `Password not strong enough.` )
        }
        //    \n" +
        const email_exists = await this.find({email})
        if (email_exists.toString()!==''){
            //console.log(email_exists)
            //console.log( email_exists.toString() )
            //console.log( email_exists.toString()!=='' )
            throw Error("Email already in use. Use another one.")
        }

        const username_exists = await this.find({username})
        if (username_exists.toString()!==''){
            throw Error("Username already in use. Use another one.")
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await this.create({ name, username, 
            email, password: hash })

        return user
}

userSchema.statics.signIn = async function (email, password){
        // validation
        console.log(email)
        console.log(email.toString())
        console.log(password)
        console.log(password.toString())
        if ( email=='' || password==''){
            throw Error("All fields are required.")
        }

        const user = await this.findOne({email: email})
        console.log(user)
        console.log(user)
        console.log(user)
        if (user==null){
            throw Error("Incorrect email.")
        }
        
        console.log(password)
        console.log(user)
        const match = await bcrypt.compare(password, user.password)
        if (!match){
            throw Error("Incorrect password.")
        }

        return user
}
module.exports = mongoose.model("User", userSchema)