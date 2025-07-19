const Product = require('../models/productModel');

exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

exports.getProducts = async (req, res, next) => {
    try {
      const filters = {};
      if (req.query.name) filters.name = new RegExp(req.query.name, 'i');
      if (req.query.category) filters.category = req.query.category;
  
      const products = await Product.find(filters).populate('category');
      res.json(products);
    } catch (err) {
      next(err);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id).populate('category');
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err) {
      next(err);
    }
  };

  exports.updateProduct = async (req, res, next) => {
    try {
      const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  exports.deleteProduct = async (req, res, next) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: 'Product deleted' });
    } catch (err) {
      next(err);
    }
  };

  exports.getLowStock = async (req, res, next) => {
    try {
      const threshold = parseInt(req.query.threshold) || 5;
      const products = await Product.find({
        'variants.quantity': { $lt: threshold },
      });
      res.json(products);
    } catch (err) {
      next(err);
    }
  };
  


