const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const axios = require('axios'); // Import axios
require('dotenv').config();

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
    '/',
    [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Please include a valid @northeastern.edu email address')
            .isEmail()
            .custom((email) => {
                if (!email.endsWith('@northeastern.edu')) {
                    throw new Error('Email must be a @northeastern.edu address');
                }
                return true;
            }),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Check if the user already exists
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    errors: [{ msg: 'User already exists' }]
                });
            }

            // Generate avatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            // Create a new user instance
            user = new User({
                name,
                email,
                avatar,
                password
            });

            // Hash password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Save user to database
            await user.save();

            // Create payload for JWT
            const payload = {
                user: {
                    id: user.id
                }
            };

            // Generate JWT token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' }, // 1 hour expiration
                async (err, token) => {
                    if (err) throw err;

                    // Make API call to another server
                    try {
                        const externalResponse = await axios.post('http://localhost:5002/api/auth/register', {
                            username: name,
                            mail: email,
                            password: password
                        });

                        // Include external API response in the response
                        res.json({
                            token,
                            externalApiResponse: externalResponse.data
                        });
                    } catch (externalErr) {
                        console.error('Error calling external API:', externalErr.message);
                        return res.status(500).json({
                            msg: 'User registered locally but failed to register on the external server'
                        });
                    }
                }
            );
        } catch (err) {
            console.error('Registration error:', err.message);
            return res.status(500).send('Server Error');
        }
    }
);

module.exports = router;