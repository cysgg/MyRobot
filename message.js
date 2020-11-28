const rules = require('./rules')
const utils = require('./utils')


async function onMessage(msg, bot) {
  const runRuleMethod = await utils.judgeValid(msg, bot)
  Object.values(rules).forEach(async rule => {
    const valid = await runRuleMethod(rule.valid)
    if(valid) {
      await rule.run(msg, bot)
    }
  })

  return
}

module.exports = onMessage

