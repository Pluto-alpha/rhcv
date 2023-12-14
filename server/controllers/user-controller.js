const User = require('../models/User');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signupSchema, loginSchema } = require('../config/validator');

/**
 * @des Register a user
 * @route POST /api/v1/auth/register
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, phone, password, role, enabled } = req.body;
        const { error } = signupSchema.validate(req.body, { abortEarly: false, });
        if (error) {
            return res.status(400).json({ success: false, msg: error.details[0] });
        }
        const userAvail = await User.findOne({ email });
        if (userAvail) {
            return res.status(400).json({ msg: 'User is already exist' })
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashPassword,
            role: role || 'Receptionist',
            enabled,
        });
        if (user) {
            return res.status(200).json({ _id: user.id, email: user.email, msg: 'User created successfully' })
        } else {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
});
/**
 * @des login a user
 * @route POST /api/v1/auth/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = loginSchema.validate(req.body, { abortEarly: false, });
        if (error) {
            return res.status(204).json({ success: false, msg: error.details[0] });
        }
        const user = await User.findOne({ email });
        if (user.enabled === false) {
            return res.status(401).json({ status: 'false', msg: 'The user is disabled from the admin side' })
        }
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "24hr" }
            );
            return res.cookie('token', token, {
                expires: new Date(Date.now() + 30 * 60 * 1000), /*Cookie expires in 30 min*/
                secure: false, /*Set to true in a production environment with HTTPS*/
                httpOnly: true, /*Make the cookie accessible only via HTTP (not JavaScript)*/
                sameSite: 'strict', /*Apply SameSite attribute for CSRF protection*/
            }).json({ token: token, _id: user.id, name: user.name, email: user.email, msg: 'Login Successful' });
        } else {
            res.status(401).json({ msg: 'Invalid credentials' });
        }
    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
});
/**
 * @des get all users
 * @route GET /api/v1/auth/user
 * @access private
 */
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const user = await User.find({}).select('-password').sort({ createdAt: -1 });
        if (!user) {
            return res.status(404).json(user, "message: Users list not found")
        } else {
            return res.status(200).json(user);
        }
    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
});
/**
 * @des get a user
 * @route GET /api/v1/auth/user:id
 * @access private
 */
const getAUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        } else {
            return res.status(200).json(user);
        }
    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
})
/**
 * @des Update the user
 * @route PUT /api/v1/auth/user:id
 * @access private
 */
const updateUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        return res.status(200).json({ updatedUser, message: 'User updated successfully' })
    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
});
/**
 * @des Delete the user
 * @route DELETE /api/v1/auth/user:id
 * @access private
 */
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        await User.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
});
/**
 * @des Reset password the user
 * @route POST /api/v1/auth/reset-password
 * @access public
 */
const resetPaswrd = asyncHandler(async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(404).json({ status: false, msg: 'Email and newPassword is mandatory' })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Update the user's password in the database
        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        return res.json({ message: 'Password reset successfully' });
    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
})
/**
 * @des logout the user
 * @route POST /api/v1/auth/logout
 * @access public
 */
const logout = asyncHandler(async (req, res) => {
    return res.cookie('token', '', { maxAge: "1" }).json({ msg: 'Logout successful' });
});


module.exports = { registerUser, loginUser, getAllUsers, getAUser, updateUser, deleteUser, logout, resetPaswrd };