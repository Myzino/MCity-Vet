import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.log(error);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});