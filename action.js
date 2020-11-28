const axios = require("axios");
const config = require("./config");
const { FileBox } = require("file-box");

// 通过群Id向某个群发消息
async function setRoomTextMsg({ id, text, bot }) {
  const rooms = await bot.Room.findAll({ id });

  rooms.forEach(async (room) => {
    await room.say(text);
  });

  return;
}

// 获得每日时间图片函数
async function getDailyData() {
  const data = await axios
    .get(config.BINGYINGDAYURL)
    .then((res) => {
      const data = res.data;
      if (data) {
        const { images } = data;
        const [todayImage] = images;
        const { enddate, urlbase, copyright } = todayImage;
        const imageId = urlbase.split("?id=OHR.")[1];
        const imageUrl = `${config.DAILYPICBASEURL}/${imageId}_1920x1080.jpg`;
        const date = `${enddate.slice(0, 4)}年${enddate.slice(
          4,
          6
        )}月${enddate.slice(6)}日`;
        const fileBox = FileBox.fromUrl(imageUrl);
        const result = { text: `${date}, ${copyright}`, image: fileBox };

        return result;
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data;
}

// 得到封装过后的mp3数据文件
async function getMusicData(musicUrl) {
  const fileBox = FileBox.fromUrl(musicUrl);
  const result = { music: fileBox };
  return result;
}

module.exports = {
  setRoomTextMsg,
  getDailyData,
  getMusicData
};
