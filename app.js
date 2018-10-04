require("dotenv").config()
const fs = require('fs')
const request = require('request')
// const spotify = Spotify(keys.spotify)

if (process.argv[2] == 'concert-this') {
  let artist = process.argv.slice(3).join('%20')
  let bandsURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp'
  
  // calls bandsintown api and grabs necessary info
  request(bandsURL, (e, r, body) => {
    if (e) { console.log(e) } else {
      let result = JSON.parse(body)
      console.log('Venue name: ' + result[1].venue.name)
      console.log('Venue location: ' + result[1].venue.city)
      console.log('Concert date: ' + result[1].venue.city)
    }
  })
}