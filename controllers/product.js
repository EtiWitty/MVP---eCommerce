const formidable = require('formidable');
const_ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.productById = ( req, res, next, id ) => {
  Product.findById(id).exec((err, product) => {
    if(err || !product) {
      return res.status(400).json({
        error: "Product not found"
      });
    }
    req.product = product
    next();
  });
}

//==========================READ===============================

exports.read = (req, res) => {
  req.product.photo = undefined
  return res.json(req.product);
};

//==========================WRITE===============================

exports.create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if(err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }

    //check for all fields
    const { 
      name, 
      description, 
      price, 
      category, 
      quantity, 
      shipping
    } = fields;

      if(
        !name || 
        !description || 
        !price || 
        !category || 
        !quantity || 
        !shipping
        ) {
          return res.status(400).json({
            error: " All fields are required!"
          });
      }

    let product = new Product(fields);

    // 1kb = 1000
    // imb = 1000000

    if(files.photo) {
      //console.log('FILES PHOTO: ',files.photo)
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "image should be less than 1mb in size"
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result)
    })
  });
};

//==========================DELETE===============================

exports.remove = (req, res) => {
  let product = req.product
  product.remove((err, deleteProduct) => {
    if(err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: 'Product deleted successfully'
    });
  });
};

//==========================UPDATE===============================

exports.update = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if(err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }
    //check for all fields
    const { 
      name, 
      description, 
      price, 
      category, 
      quantity, 
      shipping
    } = fields;

      if(
        !name || 
        !description || 
        !price || 
        !category || 
        !quantity || 
        !shipping
        ) {
          return res.status(400).json({
            error: " All fields are required!"
          });
      }

    let product = req.product;
    product = _.extend(product, fields)

   
    if(files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "image should be less than 1mb in size"
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result)
    })
  });
};