const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
   nameProduct: { type: String, required: true },
   slugNameProduct: { type: String, required: true },
   imageProduct: { type: String, required: true },
   detailProduct: { type: String },
   room: { type: mongoose.Schema.Types.ObjectId, ref: "Interior", required: true },
   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", requireed: true }
})
const Product = mongoose.model('Product', ProductSchema, 'Product')

module.exports = Product