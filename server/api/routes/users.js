const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

var db = require('../controllers/queriesMain');

router.get('/', (req,res,next) => {
    db.getAllUsers(req,res,next);
});

router.post('/', checkAuth, (req,res,next) => {
    db.createUser(req,res,next);
});

router.get('/:userId', (req,res,next) => {
    db.getUser(req,res,next);
});

router.patch('/:userId', checkAuth, (req,res,next) => {
    db.updateUser(req,res,next);
});

router.get('/setZero/:userId', checkAuth, (req,res,next) => {
    db.setToZeroOrder(req,res,next);
});

router.delete('/:userId', checkAuth, (req,res,next) => {
    db.deleteUser(req,res,next);
});

module.exports = router;