
function preparedData(req, res, next, db) {
    db.tx(t => {
      return t.batch([
        t.any(`SELECT * FROM "${process.env.POSTGRES_TBL_USER}" ORDER BY name`),
        t.any(`SELECT * FROM "${process.env.POSTGRES_TBL_PRODUCT}" ORDER BY name`),
        t.any(`SELECT * FROM "${process.env.POSTGRES_TBL_ORDER}"`)
      ]);
    })
    .then(data => {
      // No data avaiable
      if(data[0].length === 0 || data[1].length === 0) {
        res.status(200).json({
          preparedData: "false",
          message: "There are no data to show."
        });
      } else {
        // prepare the JSON string
        var preparedJSON = {} 
  
        // get all infos to the products
        preparedJSON["products"] = [];
        for(let pro_data of data[1]) {
          preparedJSON["products"].push(pro_data);
        }
  
        // iterate all users
        preparedJSON["users"] = [];
        for(let usr_data of data[0]) {
          var prodQuantities = []; 
          var cost_sum = 0;
          for(let pro_data of data[1]) {
            var quantity = 0;
            for(let order of data[2]) {
              if(usr_data.id == order.user_id && pro_data.id == order.product_id) {
                quantity = order.quantity;
              } 
            }
            prodQuantities.push(quantity);
            cost_sum += quantity * pro_data.price;
          }
          var tmp_usr = {
            id: usr_data.id,
            name: usr_data.name,
            product_quantites: prodQuantities,
            cost_sum: cost_sum
          };
          preparedJSON["users"].push(tmp_usr);
        }
        res.status(200).json({
          preparedData: "true",
          data: preparedJSON
        });
      }
    })
    .catch(function(error) {
      error.customMsg = "Could not get prepared Data (DB Error)";
      next(error);
    });
}

module.exports = {
    preparedData: preparedData   
};