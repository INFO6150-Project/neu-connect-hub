const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const adminAuth = require('../../middleware/adminAuth');
const Admin = require('../../models/Admin');
const User = require('../../models/User');
require('dotenv').config();

// @route   POST api/admin/register
// @desc    Register admin
// @access  Public
router.post(
    '/register',
    [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6+ characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let admin = await Admin.findOne({ email });
            if (admin) {
                return res.status(400).json({ msg: 'Admin already exists' });
            }

            admin = new Admin({ name, email, password, role: 'admin' });

            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);

            await admin.save();

            const payload = { admin: { id: admin.id, role: 'admin' } };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { 
                expiresIn: '5d' 
            });

            res.json({ token });
        } catch (err) {
            console.error('Error during admin registration:', err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   POST api/admin/login
// @desc    Authenticate admin & get token
// @access  Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const admin = await Admin.findOne({ email });
            if (!admin) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            const payload = { admin: { id: admin.id, role: 'admin' } };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { 
                expiresIn: '5d' 
            });

            res.json({ token });
        } catch (err) {
            console.error('Error during admin login:', err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', adminAuth, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/admin/auth
// @desc    Get admin details
// @access  Private/Admin
router.get('/auth', adminAuth, async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.json(admin);
    } catch (err) {
        console.error('Error fetching admin details:', err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/admin/users/:id
// @desc    Update user details
// @access  Private/Admin
router.put('/users/:id', adminAuth, async (req, res) => {
    const { name, email, role } = req.body;

    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update user fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;

        await user.save({ validateModifiedOnly: true });

        res.json({ msg: 'User updated successfully', user });
    } catch (err) {
        console.error('Error updating user:', err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/admin/users/:id
// @desc    Delete a user
// @access  Private/Admin
router.delete('/users/:id', adminAuth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;