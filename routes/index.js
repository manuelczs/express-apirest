const express = require('express');
const api = express.Router();
const {
  getProducts,
  getProduct,
  saveProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/product');

api.get('/product', getProducts);
api.get('/product/:productId', getProduct);
api.post('/product', saveProduct);
api.put('/product/:productId', updateProduct);
api.delete('/product/:productId', deleteProduct);

module.exports = api;
