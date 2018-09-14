var queryHelper = require('../helper/queryHelper');

function getAllProducts(req, res, next, db) {
    db.any('SELECT * FROM ' + process.env.POSTGRES_TBL_PRODUCT + ' ORDER BY name')
    .then(function(data) {
        res.status(200)
        .json({
        data: data,
        message: 'Retrieved ALL products'
        });
    })
    .catch(function(err) {
        err.customMsg = "Could not get all products (DB Error)";
        next(err);
    });
}

function createProduct(req, res, next, db) {
    // check for icon-string is in req body  
    if(!req.body.icon) {
        req.body.icon = null;
    }
    db.none('INSERT INTO ' + process.env.POSTGRES_TBL_PRODUCT + ' (name, price, icon)' +
        'VALUES(${name}, ${price}, ${icon})', req.body)
      .then(function () {
        res.status(200)
          .json({
            message: 'Inserted one product'
          });
      })
      .catch(function(error) {
        error.customMsg = "Could not create product (DB Error)";
        next(error);
      });
}

function getProduct(req, res, next, db) {
    var productID = parseInt(req.params.productId);
    db.one('SELECT * FROM ' + process.env.POSTGRES_TBL_PRODUCT + ' WHERE id = $1', productID)
      .then(function (data) {
        res.status(200)
          .json({
            data: data,
            message: 'Retrieved ONE product'
          });
      })
      .catch(function(error) {
        if(error.message && error.message === "No data returned from the query.") {
          error.status = 404; 
          error.customMsg = "Could not find product. Please check id.";
          next(error);
        } else {
          error.customMsg = "Could not get product details (DB Error)";
          next(error);
        }
      });
}

function updateProduct(req, res, next, db) {
    // prepare statement to match the req.body
    var queryString = queryHelper.updateEntryById(process.env.POSTGRES_TBL_PRODUCT, req.params.productId, req.body);
    var colValues = Object.keys(req.body).map(function (key) {
      return req.body[key];
    });
  
    db.none(queryString,colValues)
      .then(function () {
        res.status(200)
          .json({
            message: 'Updated product'
          });
      })
      .catch(function(error) {
        error.customMsg = "Could not update product details (DB Error)";
        next(error);
      });
}

function deleteProduct(req, res, next, db) {
    var productID = parseInt(req.params.productId);
    db.result('DELETE FROM ' + process.env.POSTGRES_TBL_PRODUCT + ' WHERE id = $1', productID)
      .then(function (result) {
        res.status(200)
          .json({
            message: `Removed ${result.rowCount} product`
          });
      })
      .catch(function(error) {
        error.customMsg = "Could not delete product (DB Error)";
        next(error);
      });
}

module.exports = {
    getAllProducts: getAllProducts,
    createProduct: createProduct,
    getProduct: getProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
};