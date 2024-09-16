const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Read movies from JSON file
const readMoviesFromFile = () => {
  const filePath = path.join(__dirname, 'db', 'movies.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Write movies to JSON file
const writeMoviesToFile = (movies) => {
  const filePath = path.join(__dirname, 'db', 'movies.json');
  fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));
};

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a movie
app.post('/movies', (req, res) => {
  setTimeout(() => {
    const movies = readMoviesFromFile();
    const movie = { id: movies.reduce((p, c) => { return c.id > p ? c.id : p}, 0) + 1, ...req.body };
    movies.push(movie);
    writeMoviesToFile(movies);
    res.status(201).send(movie);
  }, 2000);
});

// Read all movies
app.get('/movies', (req, res) => {
  setTimeout(() => {
    const movies = readMoviesFromFile();
    res.send(movies);
  }, 2000);
});

// Read a single movie
app.get('/movies/:id', (req, res) => {
  setTimeout(() => {
    const movies = readMoviesFromFile();
    const movie = movies.find((m) => m.id === Number(req.params.id));
    if (!movie) return res.status(404).send();
    res.send(movie);
  }, 2000);
});

// Update a movie
app.put('/movies/:id', (req, res) => {
  setTimeout(() => {
    const movies = readMoviesFromFile();
    const movieIndex = movies.findIndex((m) => m.id === Number(req.params.id));
    if (movieIndex === -1) return res.status(404).send();
    movies[movieIndex] = { ...movies[movieIndex], ...req.body };
    writeMoviesToFile(movies);
    res.send(movies[movieIndex]);
  }, 2000);
});

// Patch a movie
app.patch('/movies/:id', (req, res) => {
  setTimeout(() => {
    const movies = readMoviesFromFile();
    const movieIndex = movies.findIndex((m) => m.id === Number(req.params.id));
    if (movieIndex === -1) return res.status(404).send();
    movies[movieIndex] = { ...movies[movieIndex], ...req.body };
    writeMoviesToFile(movies);
    res.send(movies[movieIndex]);
  }, 2000);
});

// Delete a movie
app.delete('/movies/:id', (req, res) => {
  setTimeout(() => {
    const movies = readMoviesFromFile();
    const movieIndex = movies.findIndex((m) => m.id === Number(req.params.id));
    if (movieIndex === -1) return res.status(404).send();
    movies.splice(movieIndex, 1);
    writeMoviesToFile(movies);
    res.sendStatus(204);
  }, 2000);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
