const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const Product = require('../models/product')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/api/product', (req, res) => {
  res.send(200, {products: []})
})

app.get('/api/product/:productId', (req, res) => {
  res.send('Api get ' + req.params.productId)
})

app.post('/api/product', (req, res) => {
  console.log('POST api product')
  console.log(req.body)

  let product = new Product()

  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.descroption

  console.log(product)

  product.save((err, productStored) => {
    if(err) res.status(500).send({message: 'Error saving product'})
    res.status(200).send({ product: productStored })
  })
})

app.put('/api/product/:productId', (req, res) => {
})

app.delete('/api/product/:productId', (req, res) => {

})

mongoose.connect('mongodb://localhost:27018/shop', (err, res) => {
  if(err) throw err
  console.log('## Connection to mongo database stablished...')
})

app.listen(3000, () => {
  console.log(`Api Rest running on port: ${port}`)
})

