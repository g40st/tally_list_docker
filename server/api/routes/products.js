const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

var db = require('../controllers/queriesMain');

router.get('/', (req,res,next) => {
    db.getAllProducts(req,res,next);
});

router.post('/', checkAuth, (req,res,next) => {
    db.createProduct(req,res,next);
});

router.get('/:productId', (req,res,next) => {
    db.getProduct(req,res,next);
});

router.patch('/:productId', checkAuth, (req,res,next) => {
    db.updateProduct(req,res,next);
});

router.delete('/:productId', checkAuth, (req,res,next) => {
    db.deleteProduct(req,res,next);
});

module.exports = router;