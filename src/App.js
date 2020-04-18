import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Recipe from './components/Recipe';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function App() {
  const classes = useStyles();

  const APP_ID = 'ceca766d';
  const APP_KEY = '71cb3e15963a37bac99d59ba3ae7a6e3';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then(res => {
        console.log(res.data.hits);
        setRecipes(res.data.hits);
      })
      .catch(err => {
        console.log(err);
      });
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className='App'>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={getSearch}
      >
        <TextField
          id='outlined-basic'
          label='Search'
          variant='outlined'
          onChange={updateSearch}
        />
        <Fab variant='extended'>Search</Fab>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
