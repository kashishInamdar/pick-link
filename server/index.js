import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json())

const PORT = process.env.PORT   || 5000 ;

const connectDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGOODB_URI);

    if(conn){
        console.log("MongoDB Connected")
    }
}



app.listen(PORT , ()=>{
    console.log(`server is runing on Port ${PORT}`)
    connectDB()
})