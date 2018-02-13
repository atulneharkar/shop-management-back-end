import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  'productName': {
    'type': String,
    'trim': true,
    // 'required': [true, 'Please enter title'],
  },
  'productDescription': {
    'type': String,
    'trim': true,
    // 'required': [true, 'Please enter description'],
  },
  'productCategory': {
    'type': String,
    'trim': true,
    // 'required': [true, 'Please enter description'],
  },
  'productImage': {},
  'stockPurchase': [{
    'type': Schema.Types.ObjectId,
    'ref': 'StockPurchase'
  }],
  'stockSold': [{
    'type': Schema.Types.ObjectId,
    'ref': 'StockSold'
  }],
});

const Product = mongoose.model('Product', productSchema);

export default Product;