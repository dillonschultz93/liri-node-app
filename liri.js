// imports
const nodeCommands = require('./commands.js')
const fileSystem = require('fs')


// input variables
const command = process.argv[2]
const value = process.argv[3]

//clear console everytime the file is run
process.stdout.write('\x1B[2J\x1B[3J\x1B[H')

switch(command){
  case 'my-tweets':
    nodeCommands.twitterCommand()
  break;
  case 'spotify-this-song':
    nodeCommands.spotifyCommand(value)
  break;
  default:
    console.log('---------------------------------')
    console.log('Sorry, that command is not valid.')
    console.log('---------------------------------')
}