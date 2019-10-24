const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredent: { type: String, required: true },
  recipeId: { type: String, required: true },
  steps: { type: String, required: true },
});

module.exports = mongoose.model('Recipe', recipeSchema);