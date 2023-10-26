var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
function readMovies() {
  const data = fs.readFileSync(__dirname + '/movies.json', 'utf8');
  return JSON.parse(data);
}

// GET
app.get('/getFilms', function (req, res) {
  const movies = readMovies();
  res.json(movies);
});

// POST
var movies = {
      "title": "X-Men",
      "actor": "Hugh Jackman",
      "genre": "Superhero, Science Fiction",
      "imdb_link": "https://www.imdb.com/title/tt0120903/",
      "id": "6"
}
 
 app.post('/addFilm', function (req, res) {
   fs.readFile(__dirname + "/movies.json", 'utf8', function (err, data) {
     data = JSON.parse(data);
     data["movies"] = movies["movies"];
     console.log(data);
     res.end(JSON.stringify(data));
   });
 })
 

// SHOW
app.get('/getFilm/:id', function (req, res) {
  const movies = readMovies();
  const movieId = req.params.id;
  const movie = movies.movies.find((m) => m.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

 

// DELETE
app.delete('/deleteFilm/:id', function (req, res) {
  const moviesData = readMovies();
  const movieId = req.params.id;

  const movieIndex = moviesData.movies.findIndex((movie) => movie.id === movieId);

  if (movieIndex !== -1) {
    moviesData.movies.splice(movieIndex, 1);
    fs.writeFileSync(__dirname + '/movies.json', JSON.stringify(moviesData, null, 2));

    res.json(moviesData);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

 

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});