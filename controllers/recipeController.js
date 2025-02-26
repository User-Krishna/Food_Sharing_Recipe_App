const Recipe = require("../models/Recipe");

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("author", "username email");
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add a new recipe
const addRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, category, image } = req.body;

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      category,
      image,
      author: req.user.userId, // Extracted from JWT token
    });

    await newRecipe.save();
    res.status(201).json({ success: true, message: "Recipe added successfully", recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add a review to a recipe
const addReview = async (req, res) => {
  try {
    const { rating } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    recipe.ratings.push({ user: req.user.userId, rating });
    await recipe.save();

    res.json({ success: true, message: "Review added", recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getAllRecipes, addRecipe, addReview };
