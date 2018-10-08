require("dotenv").config()
const keys = require('./keys.js')
const fs = require('fs')
const request = require('request')
const moment = require('moment')
const Spotify = require('node-spotify-api')
const spotify = new Spotify(keys.spotify)

if (process.argv[2] == 'concert-this') {
  let artist = process.argv.slice(3).join('%20')
  let bandsURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp'
  
  // calls bandsintown api and spotify api and grabs necessary info
  request(bandsURL, (e, r, body) => {
    if (e) { console.log(e) } else {
      let result = JSON.parse(body)
      console.log('Venue name: ' + result[0].venue.name)
      console.log('Venue location: ' + result[0].venue.city)
      console.log('Concert date: ' + moment(result[0].datetime).format('MM/DD/YYYY'))
    }
  })
} else if (process.argv[2] == 'spotify-this-song') {
  let song = process.argv.slice(3).join(' ')
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

if (process.argv[2] == 'movie-this') {
  let movie = process.argv.slice(3).join(' ')
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