const { Client } = require('discord.js-selfbot-v13')
const User = new Client({checkUpdate: false, presence: {status: 'invisible'}})
const { inspect } = require('util')

const sprintTools = require('./config')
const owners = ['717420870267830382', '551146834941313026', '853063286320922634']

User.on('ready', async () => {
  console.log(User.user.username, 'Hola, estoy listo')
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

  if(owners.some(s=> s==msg.author.id) && msg.content == '|stats') msg.reply({allowedMentions: {repliedUser: false}, content: 'Online'}) 
})


User.login(sprintTools)