import mongoose from 'mongoose';

const stockSoldSchema = new mongoose.Schema({
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

const StockSold = mongoose.model('StockSold', stockSoldSchema);

export default StockSold;