import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import { User } from './db/schema';

const app = express();
app.use(cors());


dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
try {
    await mongoose.connect(DATABASE_URL!);
    console.log('Connected to MongoDB');
} catch (err) {
    console.error('Error connecting to MongoDB', err);
}


app.get('/adddata', async(req, res) => {
   const name = "alex";
   const email = "alex@example.com";
   const password = "password";
    const user = await User.create({ name, email, password });
    res.status(200).json(user);
});

app.get('/getdata', async(req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
