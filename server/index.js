import Express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import Link from "./models/link.js";
import path from "path";


const app = Express();
app.use(Express.json());
const __dirname = path.resolve();

const connnectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    if (conn) {
        console.log('MongoDB connected ')
    }
  }
  catch(e){
    console.log(e.message);
  }
}

connnectDB();

app.post("/link", async (req, res) => {
  const {url, slug} = req.body;
 const randomSlug = Math.random().toString(36).substring(2,7);
  const link = new Link({
    url: url,
    slug : slug || randomSlug ,
  })

  try{
    const saveLink = await link.save();
    return res.json({
      success: true,
      data: {
        // url:saveLink.url,
        // slug:saveLink.slug,
        shortUrl:`${process.env.BASE_URL}/${saveLink.slug}`
      },
      message: "Link saved successfuly"
    });
  }
  catch(e){
    res.json({
      success: false,
      message: e.message
    });
  }
})



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})
