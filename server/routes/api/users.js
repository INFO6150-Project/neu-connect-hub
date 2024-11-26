const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config');
//now we only require express-validator instead of express-validator/check
const {
    check,
    validationResult
} = require('express-validator');

const User = require('../../models/User');

// route            GET api/users
// @desc            Register user
// @access          Public
router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email address').isEmail(),
        check('password', 'please entere a password with 6 or more characters').isLength({}).isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const {
            name,
            email,
            password
        } = req.body;

        try {
            let user = await User.findOne({
                email
            })

            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: "user already exist"
                    }]
                })
            }


            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            })

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);
            console.log(user.password)

            await user.save();

            const payload = {
                user: {
                    id: user.id

                }
            }

            jwt.sign(payload,
                config.get('jwtSecret'), {
                    expiresIn: 360000 // this expires in 6 minutes change to 3600 in prod
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    });
                });


        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }



    });

module.exports = router;