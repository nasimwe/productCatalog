const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    size: String,
    color: String,
    price: Number,
    quantity: Number,
});
  
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: Number,
    discountPercentage: Number,
    variants: [variantSchema],
    createdAt: { type: Date, default: Date.now },
});
  
productSchema.virtual('finalPrice').get(function () {
    return this.price - (this.price * (this.discountPercentage / 100));
});
  
module.exports = mongoose.model('Product', productSchema);