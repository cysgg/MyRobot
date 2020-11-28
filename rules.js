const config = require("./config.js");
const golbal = require("./golbal");
const action = require("./action");
const aiReply = require("./aiReply.js");
const utils = require("./utils");

async function DefalutRuleMethod(msg, bot) {
  const msgFrom = msg.from();
  const msgRoom = msg.room();

  let fromId = "";

  if (msgFrom && msgFrom.payload && msgFrom.payload.id) {
    fromId = msgFrom.payload.id;
  }

  if (
    msgFrom &&
    msgFrom.payload &&
    [config.CONTACT.CHENYINGSHUAI.id].includes(fromId)
  ) {
    return false;
  }
  if (msg.age() > 60) {
    console.log("Message discarded because its TOO OLD(than 1 minute)");
    return false;
  }
  return true;
}

async function OpeAiReplyRule(msg, bot) {
  const msgFrom = msg.from();

  let fromId = "";

  if (msgFrom && msgFrom.payload && msgFrom.payload.id) {
    fromId = msgFrom.payload.id;
  }

  const text = msg.text();

  if (text.includes(config.EXITTEXT)) {
    golbal.aiTextOpenMap[fromId] = false;
  } else if (text.includes(config.EVOKETEXT)) {
    golbal.aiTextOpenMap[fromId] = true;
  }

  return golbal.aiTextOpenMap[fromId];
}

async function defaultRuleRunMthod(msg, bot) {
  const text = msg.text();

  let repltText = "";
  if (text.includes(config.RESTYPECAIHONGPI)) {
    repltText = await aiReply.getcaihongpiValue();
  } else if (text.includes(config.RESTYPEDUJITANG)) {
    repltText = await aiReply.getDujitangValue();
  } else {
    repltText = await aiReply.getTcenAiReply(text);
  }

  repltText.forEach(async (text) => {
    await msg.say(text);
  });
}

async function IsChenYingShuaiRuleMethod(msg, bot) {
  const msgFrom = msg.from();

  let fromId = "";

  if (msgFrom && msgFrom.payload && msgFrom.payload.id) {
    fromId = msgFrom.payload.id;
  }

  if (
    msgFrom &&
    msgFrom.payload &&
    [config.CONTACT.CHENYINGSHUAI.id].includes(fromId)
  ) {
    return true;
  }

  return false;
}

async function IsHuiMinRuleMethod(msg, bot) {
  const msgFrom = msg.from();

  let fromId = "";

  if (msgFrom && msgFrom.payload && msgFrom.payload.id) {
    fromId = msgFrom.payload.id;
  }

  if (
    msgFrom &&
    msgFrom.payload &&
    [config.CONTACT.ZHOUHUIMIN.id].includes(fromId)
  ) {
    return true;
  }

  return false;
}

async function IsZhangPengHuaRuleMethod(msg, bot) {
  const msgFrom = msg.from();

  let fromId = "";

  if (msgFrom && msgFrom.payload && msgFrom.payload.id) {
    fromId = msgFrom.payload.id;
  }

  if (
    msgFrom &&
    msgFrom.payload &&
    [config.CONTACT.ZHANGPENGHUA.id].includes(fromId)
  ) {
    return true;
  }

  return false;
}

async function MsgToMeMethod(msg, bot) {
  const text = msg.text();

  const data = await utils.fenxiPicMethod(text);
  let replyBoxs;
  switch (data.type) {
    case "text":
      replyBoxs = await aiReply.getTcenAiReply(text);
      break;
    case "emoji":
      replyBoxs = await aiReply.getImageReply(data.value);
      break;
    case "img":
      break;
    default:
  }
  // replyBoxs.forEach(async text => {
  //   await msg.say(text)
  // })
  console.log("data", data);
  // await action.setRoomTextMsg({ id: config.C2020XIANGQINQUNID, text, bot})
  return;
}

async function IsWandouMsgRuleMethod(msg, bot) {
  const msgFrom = msg.from();

  let fromId = "";

  if (msgFrom && msgFrom.payload && msgFrom.payload.id) {
    fromId = msgFrom.payload.id;
  }

  if (msgFrom && msgFrom.payload && [config.WANDOUGUNIANGID].includes(fromId)) {
    return true;
  }

  return false;
}

async function MsgToQunMethod(msg, bot) {
  const text = msg.text();
  await action.setRoomTextMsg({ id: config.C2020XIANGQINQUNID, text, bot });
  await action.setRoomTextMsg({ id: config.LANGCHEQIANDUANQUNID, text, bot });
  const daily = await action.getDailyData();

  Object.values(daily).forEach(async (text) => {
    await action.setRoomTextMsg({ id: config.C2020XIANGQINQUNID, text, bot });
  });
  return;
}

async function IsJiaLiRuleMethod(msg, bot) {
  const msgFrom = msg.from();

  let fromId = "";

  if (msgFrom && msgFrom.payload && msgFrom.payload.id) {
    fromId = msgFrom.payload.id;
  }

  if (
    msgFrom &&
    msgFrom.payload &&
    [config.CONTACT.WUJIALI.id].includes(fromId)
  ) {
    return true;
  }

  return false;
}

async function ToReturnUrlLinkMethod(msg, bot) {
  const text = msg.text();

  return;
}


async function openDiangeRule(msg, bot) {
  const msgFrom = msg.from();

  let fromId = "";

  if (msgFrom && msgFrom.payload && msgFrom.payload.id) {
    fromId = msgFrom.payload.id;
  }

  const text = msg.text();

  if (text.includes("点歌")) {
    golbal.diangeStatus[fromId] = true;
    golbal.aiTextOpenMap[fromId] = false;
  }

  console.log('golbal.diangeStatus[fromId]', golbal.diangeStatus[fromId]);

  return golbal.diangeStatus[fromId]
}

async function PlayMusicMethod(msg, bot) {

  const msgFrom = msg.from();

  let fromId = "";

  if (msgFrom && msgFrom.payload && msgFrom.payload.id) {
    fromId = msgFrom.payload.id;
  }

  if(!golbal.userCountMap[fromId]) {
    golbal.userCountMap[fromId] = 0
  }

  await aiReply.autoDiange(msg, bot);

  return;
}

module.exports = {
  // 点歌
  OPENMUSICRULE: {
    valid: [DefalutRuleMethod, openDiangeRule],
    run: PlayMusicMethod,
  },
  // 默认校验规则
  OPENREPLYRULE: {
    valid: [DefalutRuleMethod, OpeAiReplyRule],
    run: defaultRuleRunMthod,
  },
  // 自己测试
  // METOME: {
  //   valid: [IsChenYingShuaiRuleMethod],
  //   run: PlayMusicMethod,
  // },
  // 慧敏内测
  // HUIMINTEST: {
  //   valid: [IsHuiMinRuleMethod],
  //   run: PlayMusicMethod,
  // },
  // 嘉丽内测
  // JIALITEST: {
  //   valid: [IsJiaLiRuleMethod],
  //   run: PlayMusicMethod,
  // },
  // 张鹏华内测
  // IsZhangPengHuaRuleMethod: {
  //   valid: [IsZhangPengHuaRuleMethod],
  //   run: PlayMusicMethod,
  // },
  // 豌豆新闻消息转发给2020届相亲群, 朗澈前端群
  WANDOUNEWSTOQUN: {
    valid: [IsWandouMsgRuleMethod],
    run: MsgToQunMethod,
  },
};
