require("dotenv").config()
const keys = require('./keys.js')
const fs = require('fs')
const request = require('request')
const moment = require('moment')
const Spotify = require('node-spotify-api')
const inq = require('inquirer')
const spotify = new Spotify(keys.spotify)

function start() {
  inq.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'choice',
      choices: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says']
    }
  ]).then(function (answers) {
    switch (answers.choice) {
      case 'concert-this':
        inq.prompt([
          {
            type: 'input',
            message: `What artist's concert would you like to search?`,
            name: 'concert'
          }
        ]).then(answers => concertThis(answers.concert))
        break
      
      case 'spotify-this-song':
        inq.prompt([
          {
            type: 'input',
            message: 'What song would you like to spotify?',
            name: 'song'
          }
        ]).then(answers => spotifySong(answers.song))
        break
      
      case 'movie-this':
        inq.prompt([
          {
            type: 'input',
            message: 'What movie would you like to search?',
            name: 'movie'
          }
        ]).then(answers => movieThis(answers.movie))
        break
      
      case 'do-what-it-says':
        doIt()
    }   
  })
}

// calls bandsintown api and grabs necessary info
function concertThis (artist) {
    let bandsURL = `https://rest.bandsintown.com/artists/${artist.split(' ').join('+')}/events?app_id=codingbootcamp`
    
    request(bandsURL, (e, r, body) => {
      if (e) { console.log(e) } else {
        let result = JSON.parse(body)
        console.log('Venue name: ' + result[0].venue.name)
        console.log('Venue location: ' + result[0].venue.city)
        console.log('Concert date: ' + moment(result[0].datetime).format('MM/DD/YYYY'))
      }
    })
} 

// calls spotify api and grabs necessary info
function spotifySong (song) {

    if (song == '') {
      song = 'The Sign'
    }

  spotify.search({
    type: 'track',
    query: song
  })
  .then (function(r) {
    console.log('Band name: ' + r.tracks.items[0].album.artists[0].name)
    console.log('Song name: ' + r.tracks.items[0].name)
    console.log('Song name: ' + r.tracks.items[0].album.external_urls.spotify)
    console.log('Song name: ' + r.tracks.items[0].album.name)
  })
  .catch(function(e) {
    console.log(e)
  })
}

// calls omdb api and grabs necessary info
function movieThis (movie) {

    if (movie == '') {
      movie = "Mr. Nobody";
    } 

  let omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&apikey=trilogy'

  request(omdbURL, (e, r, body) => {
    if (e) { console.log(e) } else {
      let result = JSON.parse(body)
      console.log('Movie Title: ' + result.Title)
      console.log('Movie Year: ' + result.Year)
      console.log('IMDB Rating: ' + result.imdbRating)
      console.log('Rotten Tomatoes Rating: ' + result.Ratings[1].Value)
      console.log('Country movie was produced: ' + result.Country)
      console.log('Languages Available: ' + result.Language)
      console.log('Actors: ' + result.Actors)
    }
  })
}

// reads random.txt and executes command
 function doIt () {
  fs.readFile('random.txt', 'utf8', function (e, data) {
    if (e) { console.log(e) } else {
      var runArr = data.split(',')
      switch (runArr[0]) {
        case 'concert-this': 
        concertThis(runArr[1])
        break
        case 'spotify-this-song':
        spotifySong(runArr[1])
        break
        case 'movie-this':
        movieThis(runArr[1])
      }
    }
  })
}

start()