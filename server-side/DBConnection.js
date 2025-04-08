import mongoose from "mongoose";


export default async function DBConnection() {
    try {
       const db= await mongoose.connect(process.env.DB_URL+process.env.DB_NAME);
        console.log("DB Connected");
        return db
    } catch (error) {
        console.log(error.message);
    }
}