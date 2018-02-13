import StockPurchase from '../models/stockPurchase';
import Product from '../models/product';

/**
 * controller for create stockPurchase
 * POST /stockPurchase/create
 */
export const createStockPurchase = (req, res) => {
  var stockPurchase = new StockPurchase({
    'amount': req.body.amount,
    'quantity': req.body.quantity,
    'date': req.body.date
  }); 

  stockPurchase.save().then(() => {
    Product.findByIdAndUpdate(req.params.productId, {
      '$push': {
        stockPurchase: stockPurchase._id
      }
    }, {
      'new': true,
      'runValidators': true,
      'context': 'query'
    })
    .then(updatedProduct => {
      res.send(stockPurchase);
    })
  }).catch((e) => {
    res.status(400).send(e);
  });
};

/**
 * controller to get specific stockPurchase info
 * GET /stockPurchase/:id
 */
export const getStockPurchaseByID = (req, res) => {
  StockPurchase.findById(req.params.id)
    .then(stockPurchase => {
      if(!stockPurchase) {
        return Promise.reject({'status': 404});
      }

      res.status(200).send(stockPurchase);
    })
    .catch(err => {
      res.status(err.status || 400).send();
    });
};

/**
 * controller to update existing stockPurchase
 * PUT /stockPurchase/:id
 */
export const updateStockPurchase = (req, res) => {
  StockPurchase.findByIdAndUpdate(req.params.id, {
    '$set': req.body
  }, {
    'new': true,
    'runValidators': true,
    'context': 'query'
  })
  .then(updatedStockPurchase => {
    res.status(200).send(updatedStockPurchase);
  })
  .catch(err => {
    res.status(400).send(err);
  });
};

/**
 * controller to delete existing stockPurchase
 * DELETE /stockPurchase/:id
 */
export const removeStockPurchase = (req, res) => {
  StockPurchase.findByIdAndRemove(req.params.id)
  .then((stockPurchase) => {
    Product.findByIdAndUpdate(req.params.productId, {
      '$pull': {
        stockPurchase: stockPurchase._id
      }
    }, {
      'new': true,
      'runValidators': true,
      'context': 'query'
    })
    .then(updatedProduct => {
      res.status(200).send(stockPurchase);
    })
  })
  .catch(err => {
    res.status(400).send(err);
  });
};
