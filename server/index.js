const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const Product = require('../models/product')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/api/product', (req, res) => {
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({message: 'Error request'})
    if(!products) return res.status(404).send({ message: 'Products does not exists'})
    res.send(200, { products })
  })
})

app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({message: 'Error request'})
    if(!product) return res.status(404).send({ message: 'Product does not exists'})
    res.status(200).send({ product })
  })
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
  let productId = req.params.productId
  let update = req.body
  
  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if(err) res.status(500).send({ message: `Error updating the product: ${err}`})
    
    res.status(200).send({ productUpdated })
  })
})

app.delete('/api/product/:productId', (req, res) => {
  let productId = req.params.productId
  
  Product.findById(productId, (err, product) => {
    if(err) res.status(500).send({ message: `Error deleting the product: ${err}` })
  
    product.remove(err => {
      if(err) res.status(500).send({ message: `Error deleting the product: ${err}` })
      res.status(200).send({ message: `The product ${productId} was eliminated`})
    })
  })
})

mongoose.connect('mongodb://localhost:27018/shop', (err, res) => {
  if(err) throw err
  console.log('## Connection to mongo database stablished...')
})

app.listen(3000, () => {
  console.log(`Api Rest running on port: ${port}`)
})

