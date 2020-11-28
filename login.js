const action = require('./action')
const config = require('./config')

async function onLogin(user, bot) {
  console.log(`logined`);
  const contact = await bot.Contact.find({id: config.CONTACT.ZHOUHUIMIN.id})
  await contact.say(config.ROBOTSTARTMSG)
  return
}

module.exports = onLogin
