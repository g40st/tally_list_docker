const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

var db = require('../controllers/queriesMain');

router.get('/', checkAuth, (req,res,next) => {
    db.getAllSysUsers(req,res,next);
});

router.post('/signup', checkAuth, (req,res,next) => {
    db.newSysUser(req,res,next);
});

router.post('/login', (req,res,next) => {
    db.loginSysUser(req,res,next);
});

router.delete('/:userId', checkAuth, (req,res,next) => {
    db.deleteSysUser(req,res,next);
});

module.exports = router;