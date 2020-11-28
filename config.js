module.exports.C2020XIANGQINQUNID = "17341531984@chatroom"; // 2020届相亲群Id
module.exports.LIKOUJIAJIAQUNID = "17811075141@chatroom"; // 力扣加加群Id
module.exports.WANDOUGUNIANGID = "wxid_5oejrzud5qa022"; // 豌豆姑娘Id
module.exports.LANGCHEQIANDUANQUNID = "13780968548@chatroom"; // 朗澈前端群Id
module.exports.CONTACT = {
  ZHAOLIWEI: {
    id: "zlwzlw12345",
    alias: "赵立威",
  },
  ZHOUHUIMIN: {
    id: "wxid_wflkv51k217s22",
    alias: "慧敏",
  },
  WUJIALI: {
    id: "wxid_d8gpwcock53l22",
    alias: "伍嘉丽",
  },
  CHENYINGSHUAI: {
    id: "wxid_eeob6waosnk322",
    alias: "北明有宇",
  },
  ZHANGPENGHUA: {
    id: 'wxid_1zeb0cmcldbz22',
    alias: "张鹏华"
  }
};
module.exports.EVOKETEXT = "米粉"; // 唤起语
module.exports.EXITTEXT = "米粉再见"; // 结束语
module.exports.RESTYPECAIHONGPI = "彩虹屁"; // 彩虹屁
module.exports.RESTYPEDUJITANG = "毒鸡汤"; // 毒鸡汤

module.exports.ROBOTSTARTMSG = `你好，我是自动回复机器人，米粉, 现支持["毒鸡汤"] , ["彩虹屁"] , ["点歌"] 功能, 快来试用吧`; // 开机信息
module.exports.FIRSTMSG =
  '米粉来啦, 现有["毒鸡汤"] , ["彩虹屁"] 功能, 快来试用吧'; // 第一句话
module.exports.BINGYINGDAYURL =
  "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1"; // 必应每日图片
module.exports.DAILYPICBASEURL = "http://h2.ioliu.cn/bing"; // 必应图片基础路径

module.exports.TENCENTERRORMAP = {
  9: { reason: "qps超过限制", resove: "用户认证升级或者降低调用频率" },
  4096: { reason: "参数非法", resove: "请检查请求参数是否符合要求" },
  12289: {
    reason: "应用不存在",
    resove: "请检查app_id是否有效的应用标识（AppId）",
  },
  12801: { reason: "素材不存在", resove: "请检查app_id对应的素材模版id" },
  12802: {
    reason: "素材ID与应用ID不匹配",
    resove: "请检查app_id对应的素材模版id",
  },
  16385: {
    reason: "缺少app_id参数",
    resove: "请检查请求中是否包含有效的app_id参数",
  },
  16386: {
    reason: "缺少time_stamp参数",
    resove: "请检查请求中是否包含有效的time_stamp参数",
  },
  16387: {
    reason: "缺少nonce_str参数",
    resove: "请检查请求中是否包含有效的nonce_str参数",
  },
  16388: {
    reason: "请求签名无效",
    resove: "请检查请求中的签名信息（sign）是否有效",
  },
  16389: {
    reason: "缺失API权限",
    resove: "请检查应用是否勾选当前API所属接口的权限",
  },
  16390: {
    reason: "time_stamp参数无效",
    resove: "请检查time_stamp距离当前时间是否超过5分钟",
  },
  16391: { reason: "同义词识别结果为空", resove: "请尝试更换文案" },
  16392: { reason: "专有名词识别结果为空", resove: "请尝试更换文案" },
  16393: { reason: "意图识别结果为空", resove: "请尝试更换文案" },
  16394: { reason: "闲聊返回结果为空", resove: "请联系客服反馈问题" },
  16396: { reason: "图片格式非法", resove: "请检查图片格式是否符合API要求" },
  16397: { reason: "图片体积过大", resove: "请检查图片大小是否超过API限制" },
  16402: { reason: "图片没有人脸", resove: "请检查图片是否包含人脸" },
  16403: { reason: "相似度错误", resove: "请联系客服反馈问题" },
  16404: { reason: "人脸检测失败", resove: "请联系客服反馈问题" },
  16405: { reason: "图片解码失败", resove: "请联系客服反馈问题" },
  16406: { reason: "特征处理失败", resove: "请联系客服反馈问题" },
  16407: { reason: "提取轮廓错误", resove: "请联系客服反馈问题" },
  16408: { reason: "提取性别错误", resove: "请联系客服反馈问题" },
  16409: { reason: "提取表情错误", resove: "请联系客服反馈问题" },
  16410: { reason: "提取年龄错误", resove: "请联系客服反馈问题" },
  16411: { reason: "提取姿态错误", resove: "请联系客服反馈问题" },
  16412: { reason: "提取眼镜错误", resove: "请联系客服反馈问题" },
  16413: { reason: "提取魅力值错误", resove: "请联系客服反馈问题" },
  16414: { reason: "语音合成失败", resove: "请联系客服反馈问题" },
  16415: { reason: "图片为空", resove: "请检查图片是否正常" },
  16416: { reason: "个体已存在", resove: "请检查个体是否已存在" },
  16417: { reason: "个体不存在", resove: "请检查个体是否不存在" },
  16418: { reason: "人脸不存在", resove: "请检查人脸是否不存在" },
  16419: { reason: "分组不存在", resove: "请检查分组是否不存在" },
  16420: { reason: "分组列表不存在", resove: "请检查分组列表是否不存在" },
  16421: { reason: "人脸个数超过限制", resove: "请检查是否超过系统限制" },
  16422: { reason: "个体个数超过限制", resove: "请检查是否超过系统限制" },
  16423: { reason: "组个数超过限制", resove: "请检查是否超过系统限制" },
  16424: {
    reason: "对个体添加了几乎相同的人脸",
    resove: "请检查个体已添加的人脸",
  },
  16425: { reason: "无效的图片格式", resove: "请检查图片格式是否符号API要求" },
  16426: { reason: "图片模糊度检测失败", resove: "请联系客服反馈问题" },
  16427: { reason: "美食图片检测失败", resove: "请联系客服反馈问题" },
  16428: { reason: "提取图像指纹失败", resove: "请联系客服反馈问题" },
  16429: { reason: "图像特征比对失败", resove: "请联系客服反馈问题" },
  16430: { reason: "OCR照片为空", resove: "请检查待处理图片是否为空" },
  16431: { reason: "OCR识别失败", resove: "请尝试更换带有文字的图片" },
  16432: { reason: "输入图片不是身份证", resove: "请检查图片是否为身份证" },
  16433: { reason: "名片无足够文本", resove: "请检查名片是否正常" },
  16434: { reason: "名片文本行倾斜角度太大", resove: "请检查名片是否正常" },
  16435: { reason: "名片模糊", resove: "请检查名片是否正常" },
  16436: {
    reason: "名片姓名识别失败",
    resove: "请尝试更换姓名显示清晰的名片图片",
  },
  16437: {
    reason: "名片电话识别失败",
    resove: "请尝试更换电话显示清晰的名片图片",
  },
  16438: { reason: "图像为非名片图像", resove: "请尝试更换有效的名片图片" },
  16439: { reason: "检测或者识别失败", resove: "请联系客服反馈问题" },
  16440: {
    reason: "未检测到身份证",
    resove: "请对准边框(避免拍摄时倾角和旋转角过大、摄像头)",
  },
  16441: {
    reason: "请使用第二代身份证件进行扫描",
    resove: "请使用第二代身份证进行处理",
  },
  16442: {
    reason: "不是身份证正面照片",
    resove: "请使用带证件照的一面进行处理",
  },
  16443: {
    reason: "不是身份证反面照片",
    resove: "请使用身份证反面进行进行处理",
  },
  16444: { reason: "证件图片模糊", resove: "请确保证件图片清晰" },
  16445: {
    reason: "请避开灯光直射在证件表面",
    resove: "请避开灯光直射在证件表面",
  },
  16446: {
    reason: "行驾驶证OCR识别失败",
    resove: "请尝试更换有效的行驾驶证图片",
  },
  16447: { reason: "通用OCR识别失败", resove: "请尝试更换带有文字的图片" },
  16448: { reason: "银行卡OCR预处理错误", resove: "请联系客服反馈问题" },
  16449: { reason: "银行卡OCR识别失败", resove: "请尝试更换有效的银行卡图片" },
  16450: { reason: "营业执照OCR预处理失败", resove: "请联系客服反馈问题" },
  16451: { reason: "营业执照OCR识别失败", resove: "请联系客服反馈问题" },
  16452: { reason: "意图识别超时", resove: "请联系客服反馈问题" },
  16453: { reason: "闲聊处理超时", resove: "请联系客服反馈问题" },
  16454: { reason: "语音识别解码失败", resove: "请检查语音参数是否正确编码" },
  16455: {
    reason: "语音过长或空",
    resove: "请检查语音参数是否正确编码或者长度是否合法",
  },
  16456: { reason: "翻译引擎失败", resove: "请联系客服反馈问题" },
  16457: { reason: "不支持的翻译类型", resove: "请检查翻译类型参数是否合法" },
  16460: {
    reason: "输入图片与识别场景不匹配",
    resove: "请检查场景参数是否正确，所传图片与场景是否匹配",
  },
  16461: {
    reason: "识别结果为空",
    resove: "当前图片无法匹配已收录的标签，请尝试更换图片",
  },
  16462: {
    reason: "多人脸检测识别结果为空",
    resove: "图片中识别不出人脸，请尝试更换图片",
  },
  16467: { reason: "跨年龄人脸识别出错", resove: "请尝试更换有人脸的图片" },
  16468: {
    reason: "跨年龄人脸识别结果为空",
    resove: "源图片与目标图片中识别不出匹配的人脸，请尝试更换图片",
  },
  16472: {
    reason: "音频鉴黄识别出错",
    resove: "请确保音频地址能正常下载音频，尝试更换音频",
  },
};

{/* <img
  aeskey="df1ca0292ffe5fbe0a34d80ee7875fa7"
  encryver="0"
  cdnthumbaeskey="df1ca0292ffe5fbe0a34d80ee7875fa7"
  cdnthumburl="3053020100044c304a02010002043d4478b102033d11fe02043ff516d202045fc078200425617570696d675f646638333934643261343664393963345f31363036343439313834353039020401050a020201000400"
  cdnthumblength="3757"
  cdnthumbheight="120"
  cdnthumbwidth="90"
  cdnmidheight="0"
  cdnmidwidth="0"
  cdnhdheight="0"
  cdnhdwidth="0"
  cdnmidimgurl="3053020100044c304a02010002043d4478b102033d11fe02043ff516d202045fc078200425617570696d675f646638333934643261343664393963345f31363036343439313834353039020401050a020201000400"
  length="1"
  md5="2f9e095740411db0ef0cd657dc5f4734"
  hevc_mid_size="33329"
/>; */}
