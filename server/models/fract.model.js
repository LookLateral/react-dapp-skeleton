import mongoose from 'mongoose'
import crypto from 'crypto'
const FractSchema = new mongoose.Schema({
  
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}, // SIMONOTES: or just user_id?
  
  product: {type: mongoose.Schema.ObjectId, ref: 'Product'}, // SIMONOTES: or just product_id?
  
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
  
  /*
  SIMONOTES: need to add
  flag buybackoption,
  buybackowner,
  
  ...to be continued...
  */
})

export default mongoose.model('Fract', FractSchema)
