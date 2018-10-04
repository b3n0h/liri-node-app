require("dotenv").config()
const keys = require('./keys')
const fs = require('fs')
const request = require('request')
const moment = require('moment')
const Spotify = require('node-spotify-api')


var spotify = new Spotify ({
  id: keys.spotify.id,
  secret: keys.spotify.secret
})

if (process.argv[2] == 'concert-this') {
  let artist = process.argv.slice(3).join('%20')
  let bandsURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp'
  
  // calls bandsintown api and grabs necessary info
  request(bandsURL, (e, r, body) => {
    if (e) { console.log(e) } else {
      let result = JSON.parse(body)
      console.log('Venue name: ' + result[1].venue.name)
      console.log('Venue location: ' + result[1].venue.city)
      console.log('Concert date: ' + moment(result[1].datetime).format('MM/DD/YYYY'))
    }
  })
} else if (process.argv[2] == 'spotify-this-song') {
  spotify.search({
    type: 'track',
    query: 'All The Small Things'
  })
  .then (function(r) {
    console.log(r)
  })
  .catch(function(e) {
    console.log(e)
  })
}