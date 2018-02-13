import StockSold from '../models/stockSold';
import Product from '../models/product';

/**
 * controller for create stockSold
 * POST /stockSold/create
 */
export const createStockSold = (req, res) => {
  var stockSold = new StockSold({
    'amount': req.body.amount,
    'quantity': req.body.quantity,
    'date': req.body.date
  }); 

  stockSold.save().then(() => {
    Product.findByIdAndUpdate(req.params.productId, {
      '$push': {
        stockSold: stockSold._id
      }
    }, {
      'new': true,
      'runValidators': true,
      'context': 'query'
    })
    .then(updatedProduct => {
      res.send(stockSold);
    })
  }).catch((e) => {console.log(e);
    res.status(400).send(e);
  });
};

/**
 * controller to get specific stockSold info
 * GET /stockSold/:id
 */
export const getStockSoldByID = (req, res) => {
  StockSold.findById(req.params.id)
    .then(stockSold => {
      if(!stockSold) {
        return Promise.reject({'status': 404});
      }

      res.status(200).send(stockSold);
    })
    .catch(err => {
      res.status(err.status || 400).send();
    });
};

/**
 * controller to update existing stockSold
 * PUT /stockSold/:id
 */
export const updateStockSold = (req, res) => {
  StockSold.findByIdAndUpdate(req.params.id, {
    '$set': req.body
  }, {
    'new': true,
    'runValidators': true,
    'context': 'query'
  })
  .then(updatedStockSold => {
    res.status(200).send(updatedStockSold);
  })
  .catch(err => {
    res.status(400).send(err);
  });
};

/**
 * controller to delete existing stockSold
 * DELETE /stockSold/:id
 */
export const removeStockSold = (req, res) => {
  StockSold.findByIdAndRemove(req.params.id)
  .then((stockSold) => {
    Product.findByIdAndUpdate(req.params.productId, {
      '$pull': {
        stockSold: stockSold._id
      }
    }, {
      'new': true,
      'runValidators': true,
      'context': 'query'
    })
    .then(updatedProduct => {
      res.status(200).send(stockSold);
    })
  })
  .catch(err => {
    res.status(400).send(err);
  });
};
