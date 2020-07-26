const express = require('express');
const router = express.Router();

// Middleware
const authMiddleware = require('../../middlewares/auth.middleware');

// Model
const Item = require('../../models/Item');

router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll();
        res.status(200).json(items);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const newItem = await Item.create({ name: req.body.name });
        res.status(200).json(newItem);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ success: false });
        item.destroy()
            .then(() => {
                res.status(200).json({ success: true });
            })
            .catch(err => console.log(err));
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
