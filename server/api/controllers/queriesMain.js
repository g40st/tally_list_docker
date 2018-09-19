var promise = require('bluebird');

var queriesProducts = require('./queriesProducts');
var queriesOrders = require('./queriesOrders');
var queriesUsers = require('./queriesUsers');
var queriesPrepared = require('./queriesPrepared');
var queriesSysUser = require('./queriesSysUser');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var db = pgp('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@db:5432/' + process.env.POSTGRES_DB);

/* 
  product queries
*/
function getAllProducts(req, res, next) {
  queriesProducts.getAllProducts(req,res,next,db);
}

function createProduct(req, res, next) {
  queriesProducts.createProduct(req,res,next,db);
}

function getProduct(req, res, next) {
  queriesProducts.getProduct(req,res,next,db);
}

function updateProduct(req, res, next) {
  queriesProducts.updateProduct(req,res,next,db);
}

function deleteProduct(req, res, next) {
  queriesProducts.deleteProduct(req,res,next,db);
}

/* 
  user queries
*/
function getAllUsers(req, res, next) {
  queriesUsers.getAllUsers(req,res,next,db);
}

function createUser(req, res, next) {
  queriesUsers.createUser(req,res,next,db);
}

function getUser(req, res, next) {
  queriesUsers.getUser(req,res,next,db);
}

function updateUser(req, res, next) {
  queriesUsers.updateUser(req,res,next,db);
}

function setToZeroOrder(req, res, next) {
  queriesUsers.setToZeroOrder(req,res,next,db);
}

function deleteUser(req, res, next) {
  queriesUsers.deleteUser(req,res,next,db);
}

/* 
  order queries
*/
function getAllOrders(req, res, next) {
  queriesOrders.getAllOrders(req,res,next,db);
}

function incrementOrder(req, res, next) {
  queriesOrders.incrementOrder(req,res,next,db);
}

function getOrderByUser(req, res, next) {
  queriesOrders.getOrderByUser(req,res,next,db);
}

function updateOrder(req, res, next) {
  queriesOrders.updateOrder(req,res,next,db);
}

/* 
  prepared queries
*/
function preparedData(req, res, next) {
  queriesPrepared.preparedData(req,res,next,db);
}   

/* 
  sysUser queries
*/
function getAllSysUsers(req, res, next) {
  queriesSysUser.getAllSysUsers(req,res,next,db);
}

function newSysUser(req, res, next) {
  queriesSysUser.newSysUser(req,res,next,db);
}

function loginSysUser(req, res, next) {
  queriesSysUser.loginSysUser(req,res,next,db);
}

function deleteSysUser(req, res, next) {
  queriesSysUser.deleteSysUser(req,res,next,db);
}

module.exports = {
  getAllProducts: getAllProducts,
  createProduct: createProduct,
  getProduct: getProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getAllUsers: getAllUsers,
  createUser: createUser,
  getUser: getUser,
  updateUser: updateUser,
  setToZeroOrder: setToZeroOrder,
  deleteUser: deleteUser,
  getAllOrders: getAllOrders,
  incrementOrder: incrementOrder,
  getOrderByUser: getOrderByUser,
  updateOrder: updateOrder,
  preparedData: preparedData,
  getAllSysUsers: getAllSysUsers,
  newSysUser: newSysUser,
  loginSysUser: loginSysUser,
  queriesUsers: queriesUsers,
  deleteSysUser: deleteSysUser
};

