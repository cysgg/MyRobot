const axios = require("axios");
const md5 = require("md5");
const uid = require("uid");
const config = require("./config");
const utils = require("./utils");
const action = require("./action");
const golbal = require("./golbal");
// const fs = require("fs");

const defaultSuccessMsg = "你好，我是自动回复机器人，小北";
const defaultErrorMsg = "小北的螺丝松了，抱歉";
const AIBotAPPID = 2160049045;
const AIBotAppKey = "7dmcPPHkiQKliiSx";
const AIBotQuestionKey = "question";
const AIBotReqURL = "https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat"; // 智能闲聊
const AIBotImageReqURL =
  "https://api.ai.qq.com/fcgi-bin/vision/vision_imgtotext"; // 看图说话
const WANGYIYUNBASEURL = "https://autumnfish.cn"; // 网易云在线API
const WANGYIYUNPALYURL = "https://music.163.com"; //  网易云播放URL
const WANGYIYUNMEDIAURL = "https://y.music.163.com"; // 网易云媒体URL

const CaiHongPiUrl = "https://chp.shadiao.app/api.php";
const DuJiTangUrl = "https://www.iowen.cn/jitang/api/";

function getReqSign(params = [] /* 关联数组 */, appkey /* 字符串*/) {
  // 1. 字典升序排序
  params = params.sort((a, b) => {
    const aKey = Object.keys(a)[0];
    const bKey = Object.keys(b)[0];
    if (aKey > bKey) {
      return 1;
    } else if (aKey < bKey) {
      return -1;
    } else {
      return 0;
    }
  });

  // 2. 拼按URL键值对
  str = "";
  params.forEach((param) => {
    if (param) {
      const [key, value] = Object.entries(param)[0];
      if (value !== "") {
        str += `${key}=${encodeURI(value)}&`;
      }
    }
  });

  // 3. 拼接app_key
  str += "app_key=" + appkey;

  // 4. MD5运算+转换大写，得到请求签名
  sign = String.prototype.toUpperCase.call(md5(str));
  return sign;
}

async function getTcenAiReply(text) {
  const time_stamp = Date.parse(new Date()) / 1000;
  const session = "1679861316503";
  const question = text;
  const nonce_str = uid.uid();

  const query = [
    { app_id: AIBotAPPID },
    { time_stamp },
    { nonce_str },
    { session },
    { question },
    { sign: "" },
  ];

  const sign = getReqSign(query, AIBotAppKey);
  let urlStr = AIBotReqURL;

  urlStr +=
    "?" +
    query.reduce((pre, cur) => {
      const [key, value] = Object.entries(cur)[0];
      if (key !== "sign") {
        pre += `${key}=${value}&`;
      }
      return pre;
    }, "");

  urlStr += `sign=${sign}`;

  const enReqUrl = encodeURI(urlStr);

  const resData = await axios
    .get(enReqUrl)
    .then((res) => {
      const data = res.data;

      console.log("data", data);

      if (data.ret === 0) {
        const { session, answer } = data.data;
        return [].concat(answer);
      } else {
        const error = config.TENCENTERRORMAP[data.ret];
        return [].concat(`${error.reason},${error.resove}`);
      }
    })
    .catch((e) => {
      console.log("e", e);
      return [].concat(defaultErrorMsg);
    });

  return resData;
}

async function getImageReply(url) {
  const imgData = await utils.getCloudData(url);

  const time_stamp = Date.parse(new Date()) / 1000;
  const session_id = "1679861316503";
  const image = `data:image/png;base64,${Buffer.from(imgData).toString(
    "base64"
  )}`;
  // fs.writeFileSync('C:/Users/22120/Desktop/test.png', image)
  const nonce_str = uid.uid();

  const query = [
    { app_id: AIBotAPPID },
    { time_stamp },
    { nonce_str },
    { session_id },
    { image },
    { sign: "" },
  ];

  const sign = getReqSign(query, AIBotAppKey);
  const data = query.reduce((p, c) => {
    Object.entries(c).forEach(([key, value]) => {
      p[key] = value;
    });
    return p;
  }, {});
  data.sign = sign;

  let urlStr = AIBotImageReqURL;
  console.log("data1", data);

  const enReqUrl = encodeURI(urlStr);

  const resData = await axios
    .post(enReqUrl, data)
    .then((res) => {
      const data = res.data;

      console.log("data2", data);

      if (data.ret === 0) {
        const { session, answer } = data.data;
        return [].concat(answer);
      } else {
        const error = config.TENCENTERRORMAP[data.ret];
        return [].concat(`${error.reason},${error.resove}`);
      }
    })
    .catch((e) => {
      return [].concat(defaultErrorMsg);
    });

  return resData;
}

async function getAjaxData(url) {
  const resData = await axios
    .get(encodeURI(url))
    .then((res) => {
      const data = res.data;
      return data;
    })
    .catch((e) => {
      return defaultErrorMsg;
    });
  return resData;
}

async function getMusicSearch(text) {
  const data = await getAjaxData(
    `${WANGYIYUNBASEURL}/search?keywords=${text}&limit=10`
  );
  if (data.code === 200) {
    return data.result.songs.map((song) => {
      const { id, name, artists, album } = song;
      const artUrl = artists[0].img1v1Url;
      const songName = `${name}-${album.name},${artists[0].name}`;
      return {
        id,
        name,
        songName,
        artUrl,
      };
    });
  } else {
    throw new Error("搜索失败");
  }
}

async function getMusicUrlBy(id) {
  const data = await getAjaxData(`${WANGYIYUNBASEURL}/song/url?id=${id}`);
  if (data.code === 200) {
    return data.data[0].url;
  } else {
    throw new Error("歌曲详情获取失败");
  }
}

// function getReplyFunction(replyList) {
//   return replyList.reduce((pre, cur) => {
//     if (cur && typeof cur.reply === "string") {
//       return pre.concat(cur.reply.split("<br/>"));
//     }
//     return pre;
//   }, []);
// }

// async function getReplyList(value) {
//   const reqUrl = `${AIBotReqURL}?key=${AIBotKey}&${AIBotQuestionKey}=${value}`;
//   const enReqUrl = encodeURI(reqUrl);
//   const resData = await axios
//     .get(enReqUrl)
//     .then((res) => {
//       const data = res.data;
//       if (data.code === 200) {
//         const { datatype, newslist } = data;
//         if (datatype === "text") {
//           return getReplyFunction(newslist);
//         }
//       }
//       return [];
//     })
//     .catch((e) => {
//       return defaultErrorMsg;
//     });

//   const result = [].concat(resData);

//   return result;
// }

async function getcaihongpiValue() {
  const resData = await axios
    .get(CaiHongPiUrl)
    .then((res) => {
      const data = res.data;
      return data;
    })
    .catch((e) => {
      return defaultErrorMsg;
    });

  const result = [].concat(resData);

  return result;
}

async function getDujitangValue() {
  const resData = await axios
    .get(DuJiTangUrl)
    .then((res) => {
      const data = res.data;
      if (data.status === 1 && data.data) {
        const { data: { content } = {} } = data || {};
        if (content && content.content) {
          return [content.content];
        }
      }
      return [];
    })
    .catch((e) => {
      return defaultErrorMsg;
    });
  const result = [].concat(resData);
  return result;
}

async function Step1Method(msg, bot) {
  const text = msg.text();
  try {
    const searchList = await getMusicSearch(text);
    let searchMsg = '请输入序号点歌，例如："0" \n';
    searchMsg += searchList.reduce((pre, cur, index) => {
      pre += `${index}: ${cur.songName}\n`;
      return pre;
    }, "");
    console.log("searchMsg", searchMsg);
    await msg.say(searchMsg);
    return searchList;
  } catch (e) {
    console.log("e", e);
  }
}

async function Step2Method(msg, bot, list) {
  const text = msg.text();
  const index = parseInt(text);
  let searchItem = list[index];
  if (!searchItem) {
    throw new Error("查找失败");
  }
  try {
    const { id, name, songName, artUrl } = searchItem;
    console.log("searchId", searchItem);
    const ulrLink = await utils.getUrlLink({
      title: name,
      description: songName,
      thumbnailUrl: artUrl,
      url: `${WANGYIYUNMEDIAURL}/m/song/${id}?app_version=8.0.00`,
    });
    // const musicUrl = await getMusicUrlBy(searchId); // 获取详情
    // const musicmsg = await action.getMusicData(musicUrl); // 得到网易云音乐MP3文件
    console.log("musicmsg", ulrLink);
    await msg.say(ulrLink);
  } catch (e) {
    console.log("e", e);
  }
}

function runDianGeLiuChen() {
  return async function (msg, bot) {
    const msgFrom = msg.from();

    let fromId = "";

    if (msgFrom && msgFrom.payload && msgFrom.payload.id) {
      fromId = msgFrom.payload.id;
    }

    console.log('golbal.userCountMap[fromId]', golbal.userCountMap[fromId]);

    try {
      switch (golbal.userCountMap[fromId]) {
        case 0:
          await msg.say("小主，要点什么歌呢？");
          golbal.userCountMap[fromId] += 1;
          break;
        case 1:
          golbal.musicList[fromId] = await Step1Method(msg, bot);
          golbal.userCountMap[fromId] += 1;
          break;
        case 2:
          await Step2Method(msg, bot, golbal.musicList[fromId]);
          await msg.say("点歌完成，小北告退啦~");
          golbal.userCountMap[fromId] = 0;
          golbal.diangeStatus[fromId] = false;
          break;
        default:
          break;
      }
    } catch (e) {
      await msg.say("点歌失败，如需点歌，请重新输入 '点歌'");
      golbal.userCountMap[fromId] = 0;
      golbal.diangeStatus[fromId] = false;
      console.log("e", e);
    }
  };
}

module.exports = {
  // getReplyList,
  getcaihongpiValue,
  getDujitangValue,
  getTcenAiReply,
  getImageReply,
  getMusicSearch,
  getMusicUrlBy,
  autoDiange: runDianGeLiuChen(),
};
