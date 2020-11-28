// bot.ts
const { Wechaty } = require("wechaty");
const { ScanStatus } = require("wechaty-puppet");
const QrcodeTerminal = require("qrcode-terminal");
const onMessage = require("./message");
const onLogin = require('./login')

const token = "puppet_donut_02da5f3651492217";

const bot = new Wechaty({
  puppet: "wechaty-puppet-hostie",
  puppetOptions: {
    token,
  },
});

bot
  .on("scan", (qrcode, status) => {
    if (status === ScanStatus.Waiting) {
      QrcodeTerminal.generate(qrcode, {
        small: true,
      });
    }
  })
  .on("login", async user => onLogin(user, bot))
  .on("message", async msg => onMessage(msg, bot))
  .start();
