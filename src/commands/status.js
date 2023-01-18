const { Message } = require('discord.js-selfbot-v13')

/**
 * 
 * @param {Message<boolean>} msg 
 */
const statusCommand = (msg) => {
  msg.reply({allowedMentions: {repliedUser: false}, content: 'Online'}).then(tr=> {
    setTimeout(()=> tr.delete(), 10000)
  })
}

module.exports = { statusCommand }