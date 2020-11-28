// 开启智能回复Map
function getOpenStatus() {
  const openMap = {};
  return openMap;
}
// 开启点歌Map
function getDiangeStatus() {
  const isDianGe = {};
  return isDianGe;
}

// 用户点歌count进度Map
function getUserCount() {
  const countMap = {};
  return countMap;
}

// 用户点歌暂存歌曲列表Map
function getDiangeList() {
  const musicList = {};
  return musicList;
}

module.exports = {
  // 开启智能回复Map
  aiTextOpenMap: {},
  // 开启点歌Map
  diangeStatus: {},
  // 用户点歌count进度Map
  userCountMap: {},
  // 用户点歌暂存歌曲列表Map
  musicList: {},
};
