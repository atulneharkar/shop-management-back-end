import fs from 'fs';
import path from 'path';

import Product from '../models/product';
import config from '../config/config';
import redisClient from '../config/redis';

/**
 * controller for create product
 * POST /product/create
 */
export const createProduct = (req, res) => {
  var product = new Product({
    'productName': req.body.productName,
    'productDescription': req.body.productDescription,
    'productCategory': req.body.productCategory
  }); 

  product.save().then(() => {
    res.send(product);
  }).catch((e) => {
    res.status(400).send(e);
  });
};

/**
 * controller to get all/specific product
 * GET /product/
 * search all/id
 */
export const getProductList = (req, res) => {
  const search = {};

  if(req.params.category && req.params.category !== 'all' && req.params.category !== 'All') {
    search.productCategory = req.params.category;
  }

  Product.find(search)
  .populate('stockPurchase')
  .populate('stockSold')
  .then(product => {
    res.status(200).send(product);
  })
  .catch(err => {
    res.status(400).send(err);
  });
};

/**
 * controller to get specific product info
 * GET /product/:id
 */
export const getProductByID = (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if(!product) {
        return Promise.reject({'status': 404});
      }

      res.status(200).send(product);
    })
    .catch(err => {
      res.status(err.status || 400).send();
    });
};

/**
 * controller to update existing product
 * PUT /product/:id
 */
export const updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, {
    '$set': req.body
  }, {
    'new': true,
    'runValidators': true,
    'context': 'query'
  })
  .then(updatedProduct => {
    res.status(200).send(updatedProduct);
  })
  .catch(err => {
    res.status(400).send(err);
  });
};

/**
 * controller to delete existing product
 * DELETE /product/:id
 */
export const removeProduct = (req, res) => {
  Product.findByIdAndRemove(req.params.id)
  .then((product) => {
    res.status(200).send(product);
  })
  .catch(err => {
    res.status(400).send(err);
  });
};

/**
 * controller to set product avatar/profile pic
 * once image store successfully then delete previous avatar
 * POST /product/avatar
 */
export const setProductImage = (req, res) => {
  let oldImagePath = null;
  
  Product.find({ _id: req.params.id })
  .then(product => {
    oldImagePath = product[0].productImage;
  })

  Product.findByIdAndUpdate(req.params.id, {
      '$set': {
        'productImage': `http://localhost:3001/uploads/avatar/${req.file.filename}`
      }
    }, {
      'new': true
    })
    .then(product => {

      /* check for old avatar */
      if(oldImagePath) {
        let alterPath = oldImagePath.split('/uploads')[1];
        fs.unlink(path.join(__dirname, './../../uploads', alterPath));
      }

      res.send(product);
    })
    .catch(err => {
      res.status(400).send('Unable to set profile pic, Please try again');
    });
};