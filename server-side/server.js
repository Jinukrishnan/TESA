import express from "express";
import env from "dotenv"
import DBConnection from "./DBConnection.js";
import router from "./router.js";
import cors from "cors"
import path from "path";
const app=express();

console.log(path.resolve("../client-side/dist"))

env.config();
app.use(cors())
app.use(express.static("../client-side/dist"))

app.use(express.json());
app.use("/api",router)

app.get(/.*/,(req,res)=>{
    res.sendFile(path.resolve( "../client-side/dist","index.html"));

})



DBConnection().then(() => {
    app.listen(process.env.PORT||3000, () => {
        console.log(`Server is running  http://localhost:${process.env.PORT||3000}`);
    });
}).catch((err) => console.log(err));