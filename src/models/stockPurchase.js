import mongoose from 'mongoose';

const stockPurchaseSchema = new mongoose.Schema({
  'amount': {
    'type': String,
    'trim': true
  },
  'quantity': {
    'type': String,
    'trim': true
  },
  'date': {
    'type': Date,
    'trim': true
  }
});

const StockPurchase = mongoose.model('StockPurchase', stockPurchaseSchema);

export default StockPurchase;