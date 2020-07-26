const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Model
const User = require('../../models/User');
const auth = require('../../middlewares/auth.middleware');

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Simple validation
        if (!name || !email || !password)
            return res.status(400).json({ msg: 'Please enter all fields' });

        const user = await User.findOne({ where: { email } });

        if (user) return res.status(400).json({ msg: 'User already exists' });
        const newUser = User.build({
            name,
            email,
            password
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save();
                jwt.sign(
                    { email: newUser.email },
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user: {
                                name: newUser.name,
                                email: newUser.email
                            }
                        });
                    }
                );
            });
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
