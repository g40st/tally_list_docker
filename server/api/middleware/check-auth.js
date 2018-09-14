var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        var token = "";
        if(req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch(error) {
        error.status = 401;
        error.customMsg = "Auth failed";
        next(error);
    }
};