// imports
const nodeCommands = require('./commands.js')


// input variables
const command = process.argv[2]
const value = process.argv[3]

//clears console everytime the file is run
process.stdout.write('\x1B[2J\x1B[3J\x1B[H')

switch(command){
  case 'my-tweets':
    nodeCommands.twitterCommand()
    nodeCommands.writeToLog(command)
  break;
  case 'spotify-this-song':
    nodeCommands.spotifyCommand(value)
    nodeCommands.writeToLog(command, value)
  break;
  case 'movie-this':
    nodeCommands.omdbCommand(value)
    nodeCommands.writeToLog(command, value)
  break;
  case 'do-what-it-says':
    nodeCommands.documentRead(value)
    nodeCommands.writeToLog(command)
  break;
  default:
    console.log('---------------------------------')
    console.log('Sorry, that command is not valid.')
    console.log('---------------------------------')
}