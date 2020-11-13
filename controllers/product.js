const Product = require('../models/product');

const getProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: 'Error request' });
    if (!products)
      return res.status(404).send({ message: 'Products does not exists' });
    res.send(200, { products });
  });
};

const getProduct = (req, res) => {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: 'Error request' });
    if (!product)
      return res.status(404).send({ message: 'Product does not exists' });
    res.status(200).send({ product });
  });
};

const saveProduct = (req, res) => {
  console.log('POST api product');
  console.log(req.body);

  let product = new Product();

  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.descroption;

  console.log(product);

  product.save((err, productStored) => {
    if (err) res.status(500).send({ message: 'Error saving product' });
    res.status(200).send({ product: productStored });
  });
};

const updateProduct = (req, res) => {
  let productId = req.params.productId;
  let update = req.body;

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err)
      res.status(500).send({ message: `Error updating the product: ${err}` });

    res.status(200).send({ productUpdated });
  });
};

const deleteProduct = (req, res) => {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err)
      res.status(500).send({ message: `Error deleting the product: ${err}` });

    product.remove((err) => {
      if (err)
        res.status(500).send({ message: `Error deleting the product: ${err}` });
      res
        .status(200)
        .send({ message: `The product ${productId} was eliminated` });
    });
  });
};

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
};
