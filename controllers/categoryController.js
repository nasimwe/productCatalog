const Category = require('../models/categoryModel');

exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};


exports.getCategories = async (req, res, next) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  };

  exports.getCategoryById = async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ message: 'Category not found' });
      res.json(category);
    } catch (err) {
      next(err);
    }
  };

  exports.updateCategory = async (req, res, next) => {
    try {
      const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  exports.deleteCategory = async (req, res, next) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: 'Category deleted' });
    } catch (err) {
      next(err);
    }
  };
  