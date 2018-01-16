// imports
const keys = require('./keys.js') //credentials
const Twitter = require('twitter') //Twitter API
const client = new Twitter(keys.twitterKeys)
const Spotify = require('node-spotify-api') //Spotify API
const spotify = new Spotify(keys.spotifyKeys)
const request = require ('request') //Request package
const fileSystem = require('fs') //fileSystem package
const date = require('date-and-time') //date and time package
const now = new Date()


// == TWITTER COMMANDS ========================================================
const twitterCommand = function() {
  // variable that stores my personal screen name
  const userName = {screen_name: 'dill_schultz'}
  client.get(
    'statuses/user_timeline', userName, function(error, tweets, response){
    if(!error){
      console.log('Here are 20 of your most recent tweets')
      console.log('--------------------------------------\n')
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
      if(value) {
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
        // this runs if a second argument vector is not given
      } else if(!value) {
        const defaultReturn = {
          title: 'The Sign',
          artist: 'Ace of Base',
          album: 'The Sign (US Album) [Remastered]',
          preview: 'https://open.spotify.com/album/5UwIyIyFzkM7wKeGtRJPgB'
        }
        console.log("Don't know what to search? Here is a recommendation! \n")
        console.log(JSON.stringify(defaultReturn, null, 2))
      }
    }
  })
}

// == OMDB COMMANDS ===========================================================
const omdbCommand = function(value) {
  // variable that stores the movie title from the 4th node argument
  let queryUrl = `http://www.omdbapi.com/?t=${value}&y=&plot=short&apikey=40e9cece`
  request(queryUrl, function(error, response, body){
    if (!error && response.statusCode === 200 && value) {
      console.log(`🎬 Search Results For: ${value} 🎬 \n`)
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
      // this runs if a second argument vector is not given
    } else if(!value) {
      const defaultReturn = {
        title: 'Mr. Nobody',
        year: '2009',
        ratings: {
          imdb: '7.9',
          rotten_tomatoes: '66%'
        },
        country: 'Belgium, Germany, Canada, France, USA, UK',
        language: 'English, Mohawk',
        plot: "A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.",
        cast: 'Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham'
      }
      console.log("Don't know what to watch?. Here is a suggestion! \n")
      console.log(JSON.stringify(defaultReturn, null, 2))
    }
  })
}

//== FILESYSTEM COMMANDS ======================================================
const documentRead = function() {
  fileSystem.readFile('random.txt', 'utf8', function(error, data){
    if(error) {
      return console.log(error)
    }
    // variable that stores the value of what the text document contains and
    // saves it to pass through the spotifyCommand() function
    let commandValue = data.slice(18)
    spotifyCommand(commandValue)
  })
}

const writeToLog = function(argOne, argTwo) {
  // variable that gathers the time and date to later print in log.txt
  let timeStamp = date.format(now, 'YYYY/MM/DD HH:mm:ss')
  fileSystem.appendFile('log.txt', `${timeStamp}: ${argOne}, ${argTwo} \n`, function(error){
    if(error) {
      return console.log(error)
    }
  })
}

// exports
module.exports = {
  twitterCommand: twitterCommand,
  spotifyCommand: spotifyCommand,
  omdbCommand: omdbCommand,
  documentRead: documentRead,
  writeToLog: writeToLog
}
 