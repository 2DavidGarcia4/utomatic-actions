const { Client } = require('discord.js-selfbot-v13')
const Sprint = new Client({checkUpdate: false, presence: {status: 'invisible'}})
const { promotion } = require('./config'), { owners } = require('./db')
const { registerReady, sendTemplate } = require('./utils')

const { statusCommand } = require('./commands/status')
let template = ''

Sprint.on('ready', async () => {
  registerReady(Sprint, 'Estoy lista')
  
  const myServer = Sprint.guilds.cache.get('1064289165879025836')
  const templatesChannel = myServer.channels.cache.get('1064289168122978445')
  const temsg = await templatesChannel.messages.fetch('1065338914992312320')
  template = temsg.content

  // templatesChannel.topic.split(/ +/g).forEach(f=> sendTemplate(Sprint, f, template))
  // setInterval(()=> {
  //   templatesChannel.topic.split(/ +/g).forEach(f=> sendTemplate(Sprint, f, template))
  // }, 2*60*60000)
  
})

Sprint.on('messageCreate', (msg) => {
  if(msg.author.bot) return

  if(owners.some(s=> s==msg.author.id) && msg.content == 'e|status') statusCommand(msg)
})


Sprint.login(promotion)