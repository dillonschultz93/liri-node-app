// imports
const keys = require('./keys.js') //credentials
const Twitter = require('twitter') //Twitter API
const client = new Twitter(keys.twitterKeys)
const Spotify = require('node-spotify-api') //Spotify API
const spotify = new Spotify(keys.spotifyKeys)
const request = require ('request') //Request package


// == TWITTER COMMANDS ========================================================
const twitterCommand = function() {
  // variable that stores my personal screen name
  const userName = {screen_name: 'dill_schultz'}
  client.get(
    'statuses/user_timeline', userName, function(error, tweets, response){
    if(!error){
      // loops through the JSON array and returns usernames, tweet dates, and
      // tweet text
      tweets.forEach((item, index) => {
        const queryResults = {
          userName: `@${item.entities.user_mentions[0].screen_name}`,
          date: item.created_at,
          text: item.text
        }
        console.log(`🐣 ${index + 1}`)
        console.log('--------------------------')
        console.log(JSON.stringify(queryResults, null, 2))
        console.log('\n')
      })
    }
  })
}

// == SPOTIFY COMMANDS ========================================================
const spotifyCommand = function(value) {
  spotify.search(
    {type: 'track', query: `${value}`, limit: 5}, function(error, data) {
    if(!error){
      console.log(`🎵🎶 Search Results For: ${value} 🎶🎵 \n`)
      // loops through the JSON array and returns the song title, artist, album,
      // and a preview link
      data.tracks.items.forEach((item, index) => {
        const queryResults = {
          title: item.name,
          artist: item.album.artists[0].name,
          album: item.album.name,
          preview: item.album.external_urls.spotify
        }
        console.log(JSON.stringify(queryResults, null, 2))
        console.log('\n')
      })
    }
  })
}

// == OMDB COMMANDS ===========================================================
const omdbCommand = function(value) {
  // variable that stores the movie title from the 4th node argument
  let queryUrl = `http://www.omdbapi.com/?t=${value}&y=&plot=short&apikey=40e9cece`
  request(queryUrl, function(error, response, body){
    if (!error && response.statusCode === 200) {
      const queryResults = {
        title: JSON.parse(body).Title,
        year: JSON.parse(body).Year,
        ratings: {
            imdb: JSON.parse(body).imdbRating,
            rotten_tomatoes: JSON.parse(body).Ratings[1].Value
          },
        country: JSON.parse(body).Country,
        language: JSON.parse(body).Language,
        plot: JSON.parse(body).Plot,
        cast: JSON.parse(body).Actors
      }
      console.log(JSON.stringify(queryResults, null, 2))
    }
  })
}

module.exports = {
  twitterCommand: twitterCommand,
  spotifyCommand: spotifyCommand,
  omdbCommand: omdbCommand
}
 