const { Client } = require('discord.js-selfbot-v13')
const User = new Client({checkUpdate: false, presence: {status: 'invisible'}})
const { inspect } = require('util')
const { whatIs } = require('./config'), { owners } = require('./db')
const { registerReady } = require('./utils')
require('./lastBot')

const { statusCommand } = require('./commands/status')

User.on('ready', async () => {
  registerReady(User, 'Etoy listo')
  //554446119602749488
  const nexxuzServer = User.guilds.cache.get('554446119602749488')
  // farmeo-3
  const channel = nexxuzServer.channels.cache.find(f=> f.name.includes('farmeo-3'))
  // console.log(channel)

  const autoFarming = (command) => {
    channel.sendTyping()
    setTimeout(()=> {
      channel.send(command)
    }, 3000)
  }

  if(channel){
    autoFarming('.collect')
    setTimeout(()=> autoFarming('.work'), 5000)

    setInterval(()=> autoFarming('.work'), 21*60000)
    setInterval(()=> autoFarming('.collect'), 61*60000)
  }
})

User.on('messageCreate', (msg) => {
  if(msg.author.bot) return

  if(owners.some(s=> s==msg.author.id) && msg.content == 'd|status') statusCommand(msg)
})


User.login(whatIs)