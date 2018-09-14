
function getAllOrders(req, res, next, db) {
    db.any(`SELECT * FROM "${process.env.POSTGRES_TBL_ORDER}"`)
      .then(function(data) {
          res.status(200)
          .json({
            data: data,
            message: 'Retrieved ALL orders'
          });
      })
      .catch(function(error) {
        error.customMsg = "Could not get all orders (DB Error)";
        next(error);
      });
}

function incrementOrder(req, res, next, db) {
    // prepare statement to match the req.body
    var userId = req.body.userId;
    var productId = req.body.productId;
  
    // check, if entry is already there
    db.none(`INSERT INTO "${process.env.POSTGRES_TBL_ORDER}" (user_id, product_id, quantity) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT 1 FROM "${process.env.POSTGRES_TBL_ORDER}" WHERE user_id=$1 AND product_id=$2);` +
    `UPDATE "${process.env.POSTGRES_TBL_ORDER}" SET quantity=quantity+1 WHERE user_id=$1 AND product_id=$2;`, [userId, productId, 0])
      .then(function(data) {
        res.status(200)
          .json({
            message: `Incremented ${userId} and ${productId}`
          });
      })
      .catch(function(error) {
        if(error.detail && error.detail.includes("Key")) {
          error.customMsg = "Wrong user_id or product_id!";
          next(error); 
        } else {  
          error.customMsg = "Could not update order details (DB Error)";
          next(error); 
        }
      });
}


function getOrderByUser(req, res, next, db) {
  var userId = parseInt(req.params.userId);
  db.any(`SELECT * FROM "${process.env.POSTGRES_TBL_ORDER}" WHERE user_id = $1`, userId)
    .then(function (data) {
      res.status(200)
        .json({
          data: data,
          message: 'Retrieved orders by user'
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

function updateOrder(req, res, next, db) {
  // prepare statement to match the req.body
  var userId = req.body.userId;
  var productId = req.body.productId;
  var quantity = req.body.quantity;

  // check, if entry is already there
  db.none(`UPDATE "${process.env.POSTGRES_TBL_ORDER}" SET quantity=quantity-$1 WHERE user_id=$2 AND product_id=$3;`, [quantity, userId, productId])
    .then(function(data) {
      res.status(200)
        .json({
          message: `Set minus ten ${userId} and ${productId}`
        });
    })
    .catch(function(error) {
      if(error.detail && error.detail.includes("Key")) {
        error.customMsg = "Wrong user_id or product_id!";
        next(error); 
      } else {  
        error.customMsg = "Could not update order details (DB Error)";
        next(error); 
      }
    });
}

module.exports = {
    getAllOrders: getAllOrders,
    incrementOrder: incrementOrder,
    getOrderByUser: getOrderByUser,
    updateOrder: updateOrder
};