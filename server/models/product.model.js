import mongoose from 'mongoose'
import crypto from 'crypto'
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  image: {
    data: Buffer,
    contentType: String
  },
  /*artist: {
    type: String,
    trim: true,
    required: 'Artist is required'
  },*/
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String
  },
  quantity: {
    type: Number,
    required: "Quantity is required"
  },
  price: {
    type: Number,
    required: "Price is required"
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'}
  
  /*
  SIMONOTES: need to add
  productId,
  owner (is it enough the shop?),
  artist,
  size,
  flag on sale,
  flag tokenized,
  price usd and price_btc instead of price?
  
  ...to be continued...
  */
})

export default mongoose.model('Product', ProductSchema)
