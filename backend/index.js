import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import appointmentRoutes from './routes/appointment.route.js';
import authRoutes from './routes/auth.route.js';
import emailRoutes from './routes/email.route.js';
import inventoryRoutes from './routes/inventory.route.js';
import medicalrecordRoutes from './routes/medicalrecord.route.js';
import notificationRoutes from './routes/notification.route.js';
import serviceRoutes from './routes/service.route.js';
import systemlogsRoutes from './routes/systemlogs.route.js';
import technicianRoutes from './routes/technician.route.js';
import userRoutes from './routes/user.route.js';

import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL1).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.log(error);
});

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use("/backend/user", userRoutes);
app.use("/backend/auth", authRoutes);
app.use("/backend/appointment", appointmentRoutes);
app.use("/backend/inventory", inventoryRoutes);
app.use("/backend/technician", technicianRoutes);
app.use("/backend/service", serviceRoutes);
app.use("/backend/logs", systemlogsRoutes);
app.use("/backend/medical-record", medicalrecordRoutes);
app.use("/backend/notification", notificationRoutes);
app.use("/backend/email", emailRoutes);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});
