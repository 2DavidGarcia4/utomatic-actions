const { Client } = require('discord.js-selfbot-v13')

/**
 * @param {Client} client 
 * @param {string} text 
 */
const registerReady = (client, text) => {
  console.log(client.user.username+' '+text )
  if(true){
    const readyChannel = client.channels.cache.get('1065341305191940248')
    readyChannel.sendTyping()
    setTimeout(()=> readyChannel.send(text), 3000)
  }
}

/**
 * 
 * @param {Client} client 
 * @param {string} channelId 
 * @param {string} template 
 */
const sendTemplate = async (client, channelId, template) => {
  const channel = client.channels.cache.get(channelId)
  if(channel){
    channel.messages.fetch({limit: 10}).then(messages=> {
      if(!messages.map(m=> m).slice(0, 4).some(s=> s.author.id==client.user.id)){
        channel.sendTyping().catch(e=> console.log(e))
        setTimeout(()=> channel.send(template).catch(e=> console.log(e)), 3000)
      }
    })
  }
}

module.exports = {
  registerReady,
  sendTemplate
}