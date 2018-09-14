var queryHelper = require('../helper/queryHelper');

function getAllUsers(req, res, next, db) {
    db.any('SELECT * FROM ' + process.env.POSTGRES_TBL_USER + ' ORDER BY name')
      .then(function(data) {
          res.status(200)
          .json({
            data: data,
            message: 'Retrieved ALL users'
          });
      })
      .catch(function(error) {
        error.customMsg = "Could not get all users (DB Error)";
        next(error);
      });
}

function createUser(req, res, next, db) {
    db.none('INSERT INTO ' + process.env.POSTGRES_TBL_USER + ' (name)' +
        'VALUES(${name})', req.body)
      .then(function () {
        res.status(200)
          .json({
            message: 'Inserted one user'
          });
      })
      .catch(function(error) {
        error.customMsg = "Could not create user (DB Error)";
        next(error);
      });
}

function getUser(req, res, next, db) {
    var userID = parseInt(req.params.userId);
    db.one('SELECT * FROM ' + process.env.POSTGRES_TBL_USER + ' WHERE id = $1', userID)
      .then(function (data) {
        res.status(200)
          .json({
            data: data,
            message: 'Retrieved ONE user'
          });
      })
      .catch(function(error) {
        if(error.message && error.message === "No data returned from the query.") {
          error.status = 404;
          error.customMsg = "Could not find user. Please check id.";
          next(error);
        } else {
          error.customMsg = "Could not get user details (DB Error)";
          next(error);
        }
      });
}

function updateUser(req, res, next, db) {
    // prepare statement to match the req.body
    var queryString = queryHelper.updateEntryById(process.env.POSTGRES_TBL_USER, req.params.userId, req.body);
    var colValues = Object.keys(req.body).map(function (key) {
      return req.body[key];
    });
  
    db.none(queryString,colValues)
      .then(function () {
        res.status(200)
          .json({
            message: 'Updated user'
          });
      })
      .catch(function(error) {
        error.customMsg = "Could not update user details (DB Error)";
        next(error);
      });
}

function setToZeroOrder(req, res, next, db) {
    var userId = req.params.userId;
    db.any(`UPDATE "${process.env.POSTGRES_TBL_ORDER}" SET quantity=0 WHERE user_id=$1;`, [userId])
      .then(function(data) {
        res.status(200)
          .json({
            message: 'Set all to zero.'
          });
      })
      .catch(function(error) {
        error.customMsg = "Could not update user (SET Command) details (DB Error)";
        next(error); 
      });
}

function deleteUser(req, res, next, db) {
    var userID = parseInt(req.params.userId);
    db.result('DELETE FROM ' + process.env.POSTGRES_TBL_USER + ' WHERE id = $1', userID)
      .then(function (result) {
        res.status(200)
          .json({
            message: `Removed ${result.rowCount} user`
          });
      })
      .catch(function(error) {
        error.customMsg = "Could not delete user (DB Error)";
        next(error); 
      });
}

module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    getUser: getUser,
    updateUser: updateUser,
    setToZeroOrder: setToZeroOrder,
    deleteUser: deleteUser
};