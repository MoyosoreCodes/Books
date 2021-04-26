const express = require('express');
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get('/',(req, res) => {
    try {
        const result = await bookController.list();
        return res.status(result.status).json({
            message: result.message,
            data: result.data,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'error from controller',
            data: null
        })
    }
});

router.get('/:id', (req, res) => {
    const criteria = {
        ...req.params
    }
    try {
        const result = await bookController.read(criteria)
        return res.status(result.status).json({
            message: result.message,
            data: result.data,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'error from controller',
            data: null
        })
    }
});

router.post('/', (req, res) => {
    try {
        const result = await bookController.create(req.body);
        return res.status(result.status).json({
            message: result.message,
            data: result.data,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'error from controller',
            data: null
        })
    }
});

router.put('/:id', (req, res) => {
    try {
        const result = await bookController.update(req.params.id, req.body);
        return res.status(result.status).json({
            message: result.message,
            data: result.data,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'error from controller',
            data: null
        })
    }
});

router.delete('/:id', (req, res) => {
    try {
        const result = await bookController.delete(req.params)
        return res.status(result.status).json({
            message: result.message,
            data: result.data,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'error from controller',
            data: null
        })
    }
});

module.exports = router;