import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/*
{
    "email": "dalz@sena.edu.co",
    "password": "1234"
}
*/

export async function createUser(req, res) {
    const body = req.body;
    try {
        const user = new User(body);
        user.password = await bcrypt.hash(body.password, 10);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export async function getUser(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Users were not found', error });
    }
}

export async function updateUser(req, res) {
    const { id } = req.params;
    const body = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'User was not updated successfully', error });
    }
}

export async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'User was not deleted successfully', error });
    }
}
