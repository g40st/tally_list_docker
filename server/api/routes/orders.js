const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

var db = require('../controllers/queriesMain');

router.get('/', (req,res,next) => {
    db.getAllOrders(req,res,next);
});

router.post('/', (req,res,next) => {
    db.incrementOrder(req,res,next);
});

router.get('/:userId', checkAuth, (req,res,next) => {
    db.getOrderByUser(req,res,next);
});

router.patch('/', checkAuth, (req,res,next) => {
    db.updateOrder(req,res,next);
});

module.exports = router;