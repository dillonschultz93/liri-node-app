// imports
const keys = require('./keys.js') //credentials
const Twitter = require('twitter') //Twitter API
const client = new Twitter(keys.twitterKeys)
const Spotify = require('node-spotify-api') //Spotify API
const spotify = new Spotify(keys.spotifyKeys)


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
        const content = {
          userName: `@${item.entities.user_mentions[0].screen_name}`,
          date: item.created_at,
          text: item.text
        }
        console.log(`🐣 ${index + 1}`)
        console.log('--------------------------')
        console.log(JSON.stringify(content, null, 2))
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
  
}

module.exports = {
  twitterCommand: twitterCommand,
  spotifyCommand: spotifyCommand,
  omdbCommand: omdbCommand
}
 