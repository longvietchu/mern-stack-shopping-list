const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware
const authMiddleware = require('../../middlewares/auth.middleware');

// Model
const User = require('../../models/User');

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ msg: 'Please enter all fields' });
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        // Validating password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch)
                return res.status(400).json({ msg: 'Invalid credentials' });
            jwt.sign(
                { email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            );
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/user', authMiddleware, async (req, res) => {
    user = await User.findOne({ where: { email: req.user.email } });
    res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email
    });
});

module.exports = router;
