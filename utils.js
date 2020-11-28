const axios = require('axios');
const { UrlLink } = require('wechaty')
const request=require('request');
const fs = require('fs')
const xmlParser = require("xml2js")

async function judgeItem(option, msg, bot) {
  if (typeof option === "function") {
    return option(msg, bot);
  }
  if (typeof option === "boolean") {
    return option;
  }
  return false;
}

async function judgeValid(msg, bot) {
  return async function (valid) {
    if (Array.isArray(valid)) {
      const validd = await Promise.all(
        valid.map(async (func) => await judgeItem(func, msg, bot))
      );
      const isValid = validd.every((v) => v);
      return isValid;
    }
    return judgeItem(valid, msg, bot);
  };
}

async function fenxiPicMethod(text) {
  const emojiRegStr = /\<emoji.*\>/;
  const imgRegStr = /\<img.*\/\>/;
  let parseData = {}
  if (emojiRegStr.test(text)) {
    parseData.type = 'emoji'
    parseData.value = await xmlParser
      .parseStringPromise(text)
      .then((xml) => {
        if (xml && xml.msg && xml.msg.emoji && xml.msg.emoji[0] && xml.msg.emoji[0].$ && xml.msg.emoji[0].$.cdnurl) {
          const cdnurl = xml.msg.emoji[0].$.cdnurl
          return cdnurl
        }
      })
      .catch((err) => {
        throw new error("解析" + err);
      });
  } else if (imgRegStr.test(text)) {
    parseData.type = 'img'
    parseData.value = await xmlParser
      .parseStringPromise(text)
      .then((xml) => {
        console.log("xml", xml);
        if (xml && xml.msg && xml.msg.img && xml.msg.img[0] && xml.msg.img[0].$ && xml.msg.img[0].$.aeskey) {
          const aeskey = xml.msg.img[0].$.aeskey
          console.log('xml.msg.img[0].$', xml.msg.img[0].$);
          // const imgStr = getWechatImageFile('C:/Users/22120/Documents/WeChat Files/wxid_eeob6waosnk322/FileStorage/Image/2020-11')
          // 1212385157b8d432299d446df96ec356.dat
          console.log('imgStr', imgStr);
          return aeskey
        }
      })
      .catch((err) => {
        throw new Error("解析" + err);
      });
  } else {
    parseData.type = 'text'
    parseData.value = text
  }
  return parseData
}

function parseDat(absPath,cb){
  let extname = '.jpg';
  fs.readFile(absPath,(err,content)=>{
      if(err){
          console.log('解码失败:'+absPath);
          cb(null);
      }else{
          let firstV = content[0],
              nextV = content[1],
              jT = firstV ^ base,
              jB = nextV ^ next,
              gT = firstV ^ gifA,
              gB = nextV ^ gifB,
              pT = firstV ^ pngA,
              pB = nextV ^ pngB;
          var v = firstV ^ base;
          if(jT == jB){
              v = jT;
              extname = '.jpg';
          }else if(gT == gB){
              v = gT;
              extname = '.gif';
          }else if(pT == pB){
              v = pT;
              extname = '.png';
          }
          let imgPath = path.join(path.dirname(absPath),path.basename(absPath)+extname);
          let bb = content.map(br=>{
              return br ^ v
          })

          fs.writeFileSync(imgPath,bb)
          cb(null);
      }
  })
}

async function getCloudData (url) {
  // request(url).pipe(fs.createWriteStream('C:/Users/22120/Desktop/test.png'));
  return axios.get(url, {responseType: 'arraybuffer', header: { 'Content-Type': 'image/png' } }).then(async res => {
    return res.data
  }).catch(e => {
    throw new Error('请求图片失败' + e)
  })
}

async function getUrlLink({description, title, url, thumbnailUrl}) {
  return new UrlLink({
    description, title, url, thumbnailUrl
    // description : '这是图文链接里面的描述',
    // title       : '这是图文链接的标题',
    // url         : 'https://github.com/chatie/wechaty',
    // thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=30&v=4',
  })
}

module.exports = {
  judgeValid,
  fenxiPicMethod,
  getCloudData,
  getUrlLink
};
