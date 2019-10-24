const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const  Recipe= require('./models/recipe');

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://linus:nA7HxOKVadZBC9ST@cluster0-bi7s7.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
  console.log('Successfully connected to Database!');
})
.catch((error) => {
  console.log('Unable to connect to Database!');
  console.error(error);
});
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.post('/api/recipes', (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    ingredent: req.body.ingredent,
    steps: req.body.steps,
    recipeId: req.body.recipeId
  });
  recipe.save().then(() => {
      res.status(201).json({
        message: 'Post saved successfully!',
        message : 'Recipe created successfully'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

//find all
app.get('/api/recipes', (req,res,next) => {
  Recipe.find().then((recipes) => {
    res.status(200).json(recipes);
  })
  .catch((error) =>{
  res.status(400).json({
    error: error
  })
});
});


// get by id

app.get('/api/recipes/:id', (req,res,next) => {
  Recipe.findOne({
    _id: req.params.id
  }).then((recipes) => {
    res.status(200).json(recipes)
  })
  .catch((error) => {
    res.status(404).json({
      error: error
    });
  });
});


// update recipes

app.put('/api/recipes/:id', (req,res,next) => {
  const recipe = new Recipe({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    ingredent: req.body.ingredent,
    steps: req.body.steps,
    recipeId: req.body.recipeId
  });
  Recipe.updateOne({_id: req.params.id}, recipe) 
  .then(() => {
    res.status(201).json({
      message: 'Recipes Update successfully'
    })
  })
  .catch((error) => {
    res.status(400).json({
      error: error
    })
  })
})

// delete recipes
app.delete('/api/recipes/:id', (req,res,next) =>{
  Recipe.deleteOne({_id: req.params.id}).then(() => {
    res.status(200).json({
      message: 'Deleted recipes successfully'
    })
  }).catch((error) => {
    res.status(400).json({
      error: error
    })
  })
})



app.use((req, res) => {
   res.json({ message: 'Your request was successful!' }); 
});



module.exports = app;