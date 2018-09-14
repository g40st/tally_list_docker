var express = require('express');
var app = express();
const morgan = require('morgan');
var debug = require('debug')('http')
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');
const preparedRoutes = require('./api/routes/prepared');
const sysuserRoutes = require('./api/routes/sysuser');

// Logging only on dev
if(app.get('env') === 'development') {
    app.use(morgan('dev'));
}

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use('/prepared', preparedRoutes);
app.use('/sysuser', sysuserRoutes);

// error handler for 404
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    error.customMsg = "Not found";
    next(error);
});

// development error handler (stracktrace included)
if(app.get('env') === 'development') {
    app.use((error, req, res, next) => {
        debug("%O", error);
        res.status(error.status || 500);
        res.json({ 
            error: error,
        });
    });
}

// production error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            customMsg: error.customMsg
        }
    });
});

module.exports = app;