require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")

const cors = require("cors")

const userRoutes = require("./Routes/userRoutes")
const courseRoutes = require("./Routes/courseRoutes")
const translationRoutes = require("./Routes/translationRoutes")

const app = express();

app.use(cors());

app.use(express.json());

app.use("/accounts", userRoutes)
app.use("/courses", courseRoutes)
app.use("/translations", translationRoutes)

const port = () =>{
    if(!process.env.PORT){
        return 5000
    }else{
        return process.env.PORT
    }
}

mongoose.set("strictQuery", true)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        
        app.listen(port(), 
            () => console.log(
                "Connected to Db and listening on port", 
                port() 
            )
        )
    })
    .catch((error) =>{
        console.log(error)
    })
