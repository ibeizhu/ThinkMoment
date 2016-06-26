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
INSERT INTO `moment_info` VALUES ('1','Moment Wang','http://test.image.yourdream.cc/Files/76/8a/768ad6ab51b47b40a7739194a71eb00a647f317a_137258.jpg','全栈开发工程师','(+86)15001727307','chuanww@sina.com','www.chuan.com','中国上海市浦东新区陆家嘴幸福大街','{\"0\":{startDate:1464314124,endDate:1464414124,position:\"高级前端工程师\",company:\"上海优梦科技\",description:\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"},\"1\":{startDate:1464214124,endDate:1464314124,position:\"全栈开发工程师\",company:\"因特尔\",description:\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"},\"2\":{startDate:1464214124,endDate:1464314124,position:\"高级.NET工程师\",company:\"微软\",description:\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"}}','忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。','\"0\":{key:\"Javascript\",value:7},\"1\":{key:\"Nodejs/Express/Thinkjs\",value:5},\"2\":{key:\"Html5/css3\",value:6},\"3\":{key:\"Angular/Vue/Backbone/Seajs/Require\",value:5},\"4\":{key:\".NET/C#\",value:5},\"5\":{key:\"Webpack/Gulp\",value:5},\"6\":{key:\"Mysql/Sql/Redis/MongooDb\",value:4}','1464314124000');
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