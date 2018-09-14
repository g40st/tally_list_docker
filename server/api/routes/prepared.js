const express = require('express');
const router = express.Router();

var db = require('../controllers/queriesMain');

router.get('/', (req,res,next) => {
    db.preparedData(req,res,next);
});

module.exports = router;