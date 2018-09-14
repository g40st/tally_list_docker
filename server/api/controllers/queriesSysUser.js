var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

function newSysUser(req, res, next, db) {
    if(req.body.user && req.body.pwd) {
      // TODO: check the name, if it is already in the db (duplication check)
      bcrypt.hash(req.body.pwd, 10, (err, hash) => {
        if(error) {
          error.customMsg = "Something went wrong (hashing)";
          next(error);
        } else {
          db.none('INSERT INTO ' + process.env.POSTGRES_TBL_SYS_USER + ' (name, pwd_hash)' +
          'VALUES($1,$2)', [req.body.user, hash])
            .then(function () {
              res.status(201)
                .json({
                  message: 'Inserted one system user'
                });
            })
            .catch(function(error) {
              error.customMsg = "Could not create sysuser (DB Error)";
              next(error);
            });
        }
      });
    } else {
      const error = new Error('Signup Parameters');
      error.customMsg = "Wrong parameters for signup!";
      next(error);
    }
}
  
function loginSysUser(req, res, next, db) {
    if(req.body.user && req.body.pwd) {
      db.one('SELECT pwd_hash,id FROM ' + process.env.POSTGRES_TBL_SYS_USER + ' WHERE name = $1', req.body.user)
        .then(function (data) {
          bcrypt.compare(req.body.pwd, data.pwd_hash, (error, result) => {
            if(error) {
              error.status = 401;
              error.customMsg = "Auth failed";
              next(error);
            } if(result) { // password correct
              const token = jwt.sign({
                name: req.body.user,
                usr_id: data.id,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "1h"
                }
              );
              res.status(200).json({message: "Auth successful", token: token, user: req.body.user});
            } else {
              const error = new Error('Auth failed');
              error.status = 401;
              error.customMsg = "Auth failed";
              next(error);
            }
          });
        })
        .catch(function(error) {
          error.status = 401;
          error.customMsg = "Auth failed";
          next(error);
        });
    } else {
      const error = new Error('Login Parameters');
      error.customMsg = "Wrong parameters for login!";
      next(error);
    }
}

module.exports = {
    newSysUser: newSysUser,
    loginSysUser: loginSysUser   
};