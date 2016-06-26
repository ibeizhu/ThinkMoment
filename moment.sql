/*

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50712
 Source Host           : localhost
 Source Database       : moment

 Target Server Type    : MySQL
 Target Server Version : 50712
 File Encoding         : utf-8

 Date: 05/29/2016 20:30:00 PM
*/

set NAMES utf8;
set FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `moment_info`
-- ----------------------------

DROP TABLE IF EXISTS `moment_info`;
CREATE TABLE `moment_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` char(30) NOT NULL DEFAULT '' COMMENT '名称',
  `avatar` char(140) NOT NULL DEFAULT '' COMMENT '头像',
  `position` char(140) NOT NULL DEFAULT '' COMMENT '职位',
  `phone` char(30) NOT NULL DEFAULT '' COMMENT '手机号',
  `email` char(30) NOT NULL DEFAULT '' COMMENT '邮件',
  `site` char(30) NOT NULL DEFAULT '' COMMENT '网站地址',
  `address` text COMMENT '地址',
  `work` text COMMENT '工作经历',
  `introduction` text COMMENT '自我介绍',
  `skill` text COMMENT '技能',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='个人简历表';

-- ----------------------------
--  Records of `moment_info`
-- ----------------------------

BEGIN;
INSERT INTO `moment_info` (`id`, `name`, `avatar`, `position`, `phone`, `email`, `site`, `address`, `work`, `introduction`, `skill`, `update_time`)
VALUES
	(18, 'Moment Wang', 'http://test.image.yourdream.cc/Files/76/8a/768ad6ab51b47b40a7739194a71eb00a647f317a_137258.jpg', '全栈开发工程师', '15001727307', 'chuanww@sina.com', 'www.chuan.com', '中国上海市浦东新区陆家嘴幸福大街', NULL, '忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。', NULL, 1464854576852),
	(15, 'Moment Wang', 'http://test.image.yourdream.cc/Files/76/8a/768ad6ab51b47b40a7739194a71eb00a647f317a_137258.jpg', '全栈开发工程师', '15001727307', 'chuanww@sina.com', 'www.chuan.com', '中国上海市浦东新区陆家嘴幸福大街', '{\"0\":{\"startDate\":1464314124,\"endDate\":1464414124,\"position\":\"高级前端工程师\",\"company\":\"上海优梦科技\",\"description\":\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"},\"1\":{\"startDate\":1464214124,\"endDate\":1464314124,\"position\":\"全栈开发工程师\",\"company\":\"因特尔\",\"description\":\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"},\"2\":{\"startDate\":1464214124,\"endDate\":1464314124,\"position\":\"高级.NET工程师\",\"company\":\"微软\",\"description\":\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"}}', NULL, '{\"0\":{\"key\":\"Javascript\",\"value\":7},\"1\":{\"key\":\"Nodejs/Express/Thinkjs\",\"value\":5},\"2\":{\"key\":\"Html5/css3\",\"value\":6},\"3\":{\"key\":\"Angular/Vue/Backbone/Seajs/Require\",\"value\":5},\"4\":{\"key\":\".NET/C#\",\"value\":5},\"5\":{\"key\":\"Webpack/Gulp\",\"value\":5},\"6\":{\"key\":\"Mysql/Sql/Redis/MongooDb\",\"value\":4}}', 1464604810347),
	(17, 'Moment Wang', 'http://test.image.yourdream.cc/Files/76/8a/768ad6ab51b47b40a7739194a71eb00a647f317a_137258.jpg', '全栈开发工程师', '15001727307', 'chuanww@sina.com', 'www.chuan.com', '中国上海市浦东新区陆家嘴幸福大街', '{\"0\":{\"startDate\":1464314124,\"endDate\":1464414124,\"position\":\"高级前端工程师\",\"company\":\"上海优梦科技\",\"description\":\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"},\"1\":{\"startDate\":1464214124,\"endDate\":1464314124,\"position\":\"全栈开发工程师\",\"company\":\"因特尔\",\"description\":\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"},\"2\":{\"startDate\":1464214124,\"endDate\":1464314124,\"position\":\"高级.NET工程师\",\"company\":\"微软\",\"description\":\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"}}', '忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。', '{\"0\":{\"key\":\"Javascript\",\"value\":7},\"1\":{\"key\":\"Nodejs/Express/Thinkjs\",\"value\":5},\"2\":{\"key\":\"Html5/css3\",\"value\":6},\"3\":{\"key\":\"Angular/Vue/Backbone/Seajs/Require\",\"value\":5},\"4\":{\"key\":\".NET/C#\",\"value\":5},\"5\":{\"key\":\"Webpack/Gulp\",\"value\":5},\"6\":{\"key\":\"Mysql/Sql/Redis/MongooDb\",\"value\":4}}', 1464605934078);
COMMIT;

-- ----------------------------
--  Table structure for `moment_user`
-- ----------------------------

DROP TABLE IF EXISTS `moment_user`;
CREATE TABLE `moment_user`(
     `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
     `account` varchar(30) NOT NULL DEFAULT '' COMMENT '账号',
     `password` varchar(30) NOT NULL DEFAULT '' COMMENT '密码',
     `name` varchar(30) NOT NULL DEFAULT '' COMMENT '名称',
     `avatar` varchar(140) NOT NULL DEFAULT '' COMMENT '头像',
     `position` varchar(140) NOT NULL DEFAULT '' COMMENT '职位',
     `phone` varchar(30) NOT NULL DEFAULT '' COMMENT '手机号',
     `email` varchar(30) NOT NULL DEFAULT '' COMMENT '邮件',
     `site` varchar(30) NOT NULL DEFAULT '' COMMENT '网站地址',
     `address` text COMMENT '地址',
     `introduction` text COMMENT '个人简介',
     `motto` text COMMENT '座右铭',
     `isAdmin` tinyint(2) NOT NULL DEFAULT 0 COMMENT '是否管理员',
     `create_time` bigint(13) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
     `update_time` bigint(13) unsigned NOT NULL DEFAULT 0 COMMENT '修改时间',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=100000 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户表';

-- ----------------------------
--  Records of `moment_user`
-- ----------------------------

BEGIN;
INSERT INTO `moment_user` (`id`, `account`, `password`, `name`, `avatar`, `position`, `phone`, `email`, `site`, `address`, `introduction`, `create_time`, `update_time`, `motto`, `isAdmin`)
VALUES
	(100000, 'Moment', 'User@123', 'Moment Wang', '/static/build/images/avatar.jpg', '全栈开发工程师', '15001727307', 'chuanww@sina.com', 'www.chuan.com', '中国上海市浦东新区陆家嘴幸福大街', '忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。', 1464854657175, 1464854657175, '今天比昨天好，就是希望。', 1),
	(100002, 'Kobe', 'kobe@123', 'Kobe Bryant', '/static/build/images/kobe.jpg', 'NBA Start', '13123456789', 'kobe@nba.com', 'www.kobe.com', '美国洛杉矶Laker center', '忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。', 1466082333058, 1466082333058, 'where amazing happens', 0),
	(100003, 'T-Mac', 't-mac@123', 'Tracy McGrady', '/static/build/images/t-mac.jpg', 'NBA Start', '13123456711', 't-mac@nba.com', 'www.t-mac.com', '美国火箭队', '忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。', 1466082417702, 1466082417702, 'where amazing happens', 0),
	(100001, 'Iverson', 'iverson@123', 'Allen Iverson', '/static/build/images/iverson.jpg', 'NBA Start', '13123456711', 'iverson@nba.com', 'www.iverson.com', '美国76队', '忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。', 1466082613985, 1466082613985, 'where amazing happens', 0);
COMMIT;

-- ----------------------------
--  Table structure for `moment_contact`
-- ----------------------------

DROP TABLE IF EXISTS `moment_contact`;
CREATE TABLE `moment_contact`(
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
    `user_id` INT(11) unsigned NOT NULL DEFAULT 0 COMMENT '用户ID',
    `name` varchar(20) NOT NULL DEFAULT '' COMMENT '姓名',
    `email` varchar(30) NOT NULL DEFAULT '' COMMENT '邮箱地址',
    `message` text COMMENT '消息',
    `create_time` bigint(13) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time` bigint(13) unsigned NOT NULL DEFAULT 0 COMMENT '修改时间',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=200000 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='联系表';

-- ----------------------------
--  Table structure for `moment_work`
-- ----------------------------
DROP TABLE IF EXISTS `moment_work`;
CREATE TABLE `moment_work`(
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
    `user_id` INT(11) unsigned NOT NULL DEFAULT 0 COMMENT '用户ID',
    `company` varchar(30) NOT NULL DEFAULT '' COMMENT '公司',
    `image` varchar(30) NOT NULL DEFAULT '' COMMENT '图片',
    `detail` text COMMENT '简介',
    `startTime` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '开始时间',
    `endTime` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '结束时间',
    `create_time` bigint(13) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time` bigint(13) unsigned NOT NULL DEFAULT 0 COMMENT '修改时间',
    PRIMARY KEY (`id`)
)ENGINE=MyISAM AUTO_INCREMENT=300000 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='工作简历表';

-- ----------------------------
--  Records of `moment_work`
-- ----------------------------

BEGIN;
INSERT INTO `moment_work` (`id`, `user_id`, `company`, `image`, `detail`, `startTime`, `endTime`, `create_time`, `update_time`)
VALUES
	(300008, 100000, 'MicroSoft', '/static/build/images/work3.jpg', '科比是NBA最好的得分手之一，突破、投篮、罚球、三分球他都驾轻就熟，几乎没有进攻盲区，单场比赛81分的个人纪录就有力地证明了这一点。除了疯狂的得分外，科比的组织能力也很出众，经常担任球队进攻的第一发起人。另外科比还是联盟中最好的防守人之一，贴身防守非常具有压迫性。', 1464857522022, 1464857522022, 1464857522022, 1464857522022),
	(300006, 100000, 'MicroSoft', '/static/build/images/work1.jpg', '科比是NBA最好的得分手之一，突破、投篮、罚球、三分球他都驾轻就熟，几乎没有进攻盲区，单场比赛81分的个人纪录就有力地证明了这一点。除了疯狂的得分外，科比的组织能力也很出众，经常担任球队进攻的第一发起人。另外科比还是联盟中最好的防守人之一，贴身防守非常具有压迫性。', 1464857482212, 1464857482212, 1464857482212, 1464857482212),
	(300007, 100000, 'MicroSoft', '/static/build/images/work2.jpg', '科比是NBA最好的得分手之一，突破、投篮、罚球、三分球他都驾轻就熟，几乎没有进攻盲区，单场比赛81分的个人纪录就有力地证明了这一点。除了疯狂的得分外，科比的组织能力也很出众，经常担任球队进攻的第一发起人。另外科比还是联盟中最好的防守人之一，贴身防守非常具有压迫性。', 1464857519139, 1464857519139, 1464857519139, 1464857519139);
COMMIT;

-- ----------------------------
--  Table structure for `moment_statistic`
-- ----------------------------
DROP TABLE IF EXISTS `moment_statistic`;
CREATE TABLE `moment_statistic`(
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
    `liked` INT(11) unsigned NOT NULL DEFAULT 0 COMMENT '点赞人数',
    `contact` INT(11) unsigned NOT NULL DEFAULT 0 COMMENT '联系我人数',
    `day_visit` INT(11) unsigned NOT NULL DEFAULT 0 COMMENT '当日访问人数',
    `total_visit` INT(11) unsigned NOT NULL DEFAULT 0 COMMENT '总访问人数',
    `create_time` bigint(13) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time` bigint(13) unsigned NOT NULL DEFAULT 0 COMMENT '修改时间',
    PRIMARY KEY (`id`)
)ENGINE=MyISAM AUTO_INCREMENT=400000 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='统计表';

-- ----------------------------
--  Records of `moment_statistic`
-- ----------------------------

BEGIN;
INSERT INTO `moment_statistic` (`id`, `liked`, `contact`, `day_visit`, `total_visit`, `create_time`, `update_time`)
VALUES
	(400000, 5897, 2637, 978, 45325, 1465219097630, 1465219097630);
COMMIT;


-- ----------------------------
--  Table structure for `moment_chatrelation`
-- ----------------------------
DROP TABLE IF EXISTS `moment_chatrelation`;
CREATE TABLE `moment_chatrelation`(
    `relationId` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键聊天关系id',
    `collectionId` varchar(30) NOT NULL DEFAULT '' COMMENT '聊天对象的id集合体',
    `create_time` bigint(13) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time` bigint(13) unsigned NOT NULL DEFAULT 0 COMMENT '修改时间',
    PRIMARY KEY (`relationId`)
)ENGINE=MyISAM AUTO_INCREMENT=500000 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='聊天关系表';

-- ----------------------------
--  Table structure for `moment_chat`
-- ----------------------------
DROP TABLE IF EXISTS `moment_chat`;
CREATE TABLE `moment_chat`(
    `chatId` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键聊天id',
    `relationId` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '关系id',
    `speakerId` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '说话人',
    `audienceId` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '聆听者',
    `message` text COMMENT '聊天内容',
    `status` tinyint(2) NOT NULL DEFAULT 0 COMMENT '未读状态',
    `create_time` bigint(13) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time` bigint(13) unsigned NOT NULL DEFAULT 0 COMMENT '修改时间',
    PRIMARY KEY (`chatId`)
)ENGINE=MyISAM AUTO_INCREMENT=600000 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='聊天表';

-- ----------------------------
--  Records of `moment_chat`
-- ----------------------------

BEGIN;

INSERT INTO `moment_chat` (`chatId`, `relationId`, `speakerId`, `audienceId`, `message`, `status`, `create_time`, `update_time`)
VALUES
	(600000, 100001, 100000, 100001, 'Hello,你好,我是Moment', 0, 1466083400587, 1466083400587),
	(600001, 100001, 100000, 100001, '你现在在干什么呢', 0, 1466083454131, 1466083454131),
	(600002, 100001, 100001, 100000, '我在家里看电视,你呢?', 0, 1466083483663, 1466083483663),
	(600003, 100001, 100000, 100001, '我正在家里写代码呢', 0, 1466083508327, 1466083508327),
	(600004, 100001, 100000, 100001, '你好你好', 0, 1466087433036, 1466087433036),
	(600005, 100001, 100000, 100001, '你好你好', 0, 1466087453642, 1466087453642),
	(600006, 100001, 100000, 100001, '你好你好', 0, 1466087470434, 1466087470434),
	(600007, 100001, 100000, 100001, '你好你好', 0, 1466087809001, 1466087809001),
	(600008, 100002, 100000, 100002, 'Hi Kobe,how are you?', 0, 1466323479687, 1466323479687),
	(600009, 100002, 100000, 100002, 'what are you doing now?', 0, 1466323510091, 1466323510091),
	(600010, 100002, 100002, 100000, 'I am playing basketball,join me?', 0, 1466323545862, 1466323545862),
	(600011, 100002, 100000, 100002, 'No,I am writing code,I am very busy now,hope tomorrow', 0, 1466323625255, 1466323625255),
	(600012, 100003, 100000, 100003, 'Hi T-mac,where are you', 0, 1466323802423, 1466323802423),
	(600013, 100003, 100000, 100003, 'if you recieve this message , reply me', 0, 1466323944016, 1466323944016),
	(600018, 100002, 100002, 100002, 'I am ShangHai now\n', 0, 1466927353122, 1466927353122),
	(600017, 100002, 100000, 100002, 'Hi,Kobe,My brother,Where are you?\n', 0, 1466927225244, 1466927225244),
	(600019, 100002, 100002, 100002, 'when did you come to Shanghai?\n', 0, 1466927578598, 1466927578598),
	(600020, 100002, 100000, 100002, 'when did you come to Shanghai?\n', 0, 1466928233719, 1466928233719),
	(600021, 100002, 100002, 100002, 'this morning\n', 0, 1466928251203, 1466928251203),
	(600022, 100003, 100003, 100003, 'oh,sorry Moment,I am offline this days\n', 0, 1466928571946, 1466928571946);
COMMIT;
