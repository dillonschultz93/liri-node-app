// imports
const keys = require('./keys.js') //credentials
const Twitter = require('twitter') //Twitter API
const client = new Twitter(keys.twitterKeys)
const Spotify = require('node-spotify-api') //Spotify API
const spotify = new Spotify(keys.spotifyKeys)


// == TWITTER COMMANDS ========================================================
const twitterCommand = function() {
  const userName = {screen_name: 'dill_schultz'}
  client.get(
    'statuses/user_timeline', userName, function(error, tweets, response){
    if(!error){
      tweets.forEach((item, index) => {
        const content = {
          userName: `@${item.entities.user_mentions[0].screen_name}`,
          date: item.created_at,
          text: item.text
        }
        console.log('--------------------------')
        console.log(`Tweet number: ${index + 1}`)
        console.log('--------------------------')
        console.log(JSON.stringify(content, null, 2))
      })
    }
  })
}

// == SPOTIFY COMMANDS ========================================================
const spotifyCommand = function(value) {
  spotify.search({type: 'track', query: `${value}`}, function(error, data){
    if(error){
      return console.log(error)
    }
    console.log(data.tracks.items)
  })
}

module.exports = {
  twitterCommand: twitterCommand,
  spotifyCommand: spotifyCommand
}
