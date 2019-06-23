const formidable = require('formidable');
const_ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

//=========================Middleware==============================

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


//========================================================
/* 
 
Return the product based on sall and arrival 
these are type of queries that can come from a client:

 *by sell = /products?sortBy=sold&order=des&limit=4
 *by arrival = /products?sortBy=createdAt&order=des&limit=4
 *if no prams sent, then all products will return

 */

 exports.list = (req, res) => {
   let order = req.query.order ? req.query.order : 'asc'
   let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
   let limit = req.query.limit ? req.query.limit : 6

   Product.find()
      .select('-photo')
      .populate('category')
      .sort([[ sortBy, order]])
      .limit(limit)
      .exec((err, products) => {
        if(err) {
          return res.status(400).json({
            error: 'Products not found'
          });
        }
        res.send(products)
      })
 } 

