import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    schedule: {
        type: String,
    },
    technicianName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
    },
    patient: {
        _id: mongoose.Schema.Types.ObjectId,
        typeOfAnimal: {
            type: String,
        },
        numberOfHeads: {
            type: Number,
        },
        age: {
            type: Number,
        },
        services: [{
            type: String,
        }],
        address: {
            type: String,
        },
        landmark: {
            type: String,
        },
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rescheduled', 'Cancelled', 'Completed'],
        default: 'Pending',
    }
}, {
    timestamps: true // Add this to include createdAt and updatedAt timestamps
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;