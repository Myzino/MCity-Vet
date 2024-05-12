import bcryptjs from "bcryptjs";
import Appointment from "../models/appointment.model.js";
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
    res.json({
        message: 'API is working!',
    });
}

// Add User
export const createUser = async (req, res, next) => {
    const { firstName, lastName, middleName, email, password, role, address, gender, birthdate, phone } = req.body;

    try {
        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcryptjs.hashSync(password, 12);

        const capitalizeAndTrim = (value) => {
            if (typeof value === 'string') {
                return value.trim().charAt(0).toUpperCase() + value.trim().slice(1);
            }
            return value;
        };

        const newUser = new User({
            firstName: capitalizeAndTrim(firstName),
            lastName: capitalizeAndTrim(lastName),
            email,
            password: hashedPassword,
            middleName: capitalizeAndTrim(middleName),
            role,
            address,
            gender,
            birthdate,
            phone,
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};



// Update User
export const updateUser = async (req, res, next) => {
    try {
        const userIdToUpdate = req.params.id;

        // Allow admins to update any user account
        if (req.user.role === 'admin' || req.user.id === userIdToUpdate) {
            if (req.body.password) {
                req.body.password = bcryptjs.hashSync(req.body.password, 12);
            }

            const capitalizeAndTrim = (value) => {
                if (typeof value === 'string') {
                    return value.trim().charAt(0).toUpperCase() + value.trim().slice(1);
                }
                return value;
            };

            const updatedUser = await User.findByIdAndUpdate(
                userIdToUpdate,
                {
                    $set: {
                        firstName: capitalizeAndTrim(req.body.firstName),
                        lastName: capitalizeAndTrim(req.body.lastName),
                        middleName: capitalizeAndTrim(req.body.middleName),
                        role: req.body.role,
                        birthdate: req.body.birthdate,
                        address: req.body.address,
                        phone: req.body.phone,
                        email: req.body.email,
                        password: req.body.password,
                        profilePicture: req.body.profilePicture,
                    },
                },
                { new: true }
            );
            
            const { password, ...rest } = updatedUser._doc;
            res.status(200).json(rest);
        } else {
            // If the user is not authorized to update the account
            return next(errorHandler(403, 'You are not authorized to update this account.'));
        }
    } catch (error) {
        next(error);
    }
};


// Delete User
export const deleteUser = async (req, res, next) => {
    console.log("A user is attempting to delete an account. \nUser Role:", req.user.role);
    console.log("User ID:", req.user.id);
    console.log("Target User ID:", req.params.id);

    try {
        // Check if the user is an admin or is deleting their own account
        if (req.user.role === 'admin' || req.user.id === req.params.id) {
            // Only admins or the account owner can delete the account

            // Perform the deletion
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'User has been deleted.' });
        } else {
            // If the user is not authorized to delete the account
            return next(errorHandler(403, 'You are not authorized to delete this account.'));
        }
    } catch (error) {
        next(error);
    }
}

// Get All Users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Get All Role Stats
export const getRoleStatistics = async (req, res, next) => {
    try {
        const users = await User.find();

        // Count the number of users for each role
        const roleCounts = {
            customer: 0,
            admin: 0,
            technician: 0,
            secretary: 0,
        };

        users.forEach((user) => {
            roleCounts[user.role] += 1;
        });

        res.status(200).json(roleCounts);
    } catch (error) {
        next(error);
    }
};

// Get User by ID
export const getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// View User Profile by ID
export const getUserProfileById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

// View User Profile
export const viewUserProfile = async (req, res, next) => {
    try {
        const { password, ...rest } = req.user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};


// Get Appointments by User
export const getAppointmentsByUser = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      // Find all appointments created by the specified user
      const appointments = await Appointment.find({ createdBy: id });
  
      if (appointments.length === 0) {
        return res.status(200).json({ message: "No appointments found for this user." });
      }
  
      res.status(200).json(appointments);
    } catch (error) {
      // Handle the error without logging to the console
      res.status(500).json({ message: "Internal server error." });
    }
  };
  