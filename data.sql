-- MySQL dump 10.13  Distrib 5.1.73, for redhat-linux-gnu (i386)
--
-- Host: localhost    Database: moment
-- ------------------------------------------------------
-- Server version	5.1.73

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `moment`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `moment` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `moment`;

--
-- Table structure for table `moment_chat`
--

DROP TABLE IF EXISTS `moment_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moment_chat` (
  `chatId` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键聊天id',
  `relationId` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '关系id',
  `speakerId` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '说话人',
  `audienceId` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '聆听者',
  `message` text COMMENT '聊天内容',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '未读状态',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  `virtualChatId` bigint(13) DEFAULT NULL,
  PRIMARY KEY (`chatId`)
) ENGINE=MyISAM AUTO_INCREMENT=600139 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='聊天表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment_chat`
--

LOCK TABLES `moment_chat` WRITE;
/*!40000 ALTER TABLE `moment_chat` DISABLE KEYS */;
INSERT INTO `moment_chat` VALUES (600000,100001,100000,100001,'Hello,你好,我是Moment',0,1466083400587,1466083400587,NULL),(600001,100001,100000,100001,'你现在在干什么呢',0,1466083454131,1466083454131,NULL),(600002,100001,100001,100000,'我在家里看电视,你呢?',0,1466083483663,1466083483663,NULL),(600003,100001,100000,100001,'我正在家里写代码呢',0,1466083508327,1466083508327,NULL),(600004,100001,100000,100001,'你好你好',0,1466087433036,1466087433036,NULL),(600005,100001,100000,100001,'你好你好',0,1466087453642,1466087453642,NULL),(600006,100001,100000,100001,'你好你好',0,1466087470434,1466087470434,NULL),(600007,100001,100000,100001,'你好你好',0,1466087809001,1466087809001,NULL),(600008,100002,100000,100002,'Hi Kobe,how are you?',0,1466323479687,1466323479687,NULL),(600009,100002,100000,100002,'what are you doing now?',0,1466323510091,1466323510091,NULL),(600010,100002,100002,100000,'I am playing basketball,join me?',0,1466323545862,1466323545862,NULL),(600011,100002,100000,100002,'No,I am writing code,I am very busy now,hope tomorrow',0,1466323625255,1466323625255,NULL),(600012,100003,100000,100003,'Hi T-mac,where are you',0,1466323802423,1466323802423,NULL),(600013,100003,100000,100003,'if you recieve this message , reply me',0,1466323944016,1466323944016,NULL),(600018,100002,100002,100002,'I am ShangHai now\n',0,1466927353122,1466927353122,NULL),(600017,100002,100000,100002,'Hi,Kobe,My brother,Where are you?\n',0,1466927225244,1466927225244,NULL),(600019,100002,100002,100002,'when did you come to Shanghai?\n',0,1466927578598,1466927578598,NULL),(600020,100002,100000,100002,'when did you come to Shanghai?\n',0,1466928233719,1466928233719,NULL),(600021,100002,100002,100002,'this morning\n',0,1466928251203,1466928251203,NULL),(600022,100003,100003,100003,'oh,sorry Moment,I am offline this days\n',0,1466928571946,1466928571946,NULL),(600023,100002,100002,100002,'Hi,Moment,I am using your chat tool\n',0,1466932005463,1466932005463,NULL),(600024,100002,100002,100002,'hello ?\n\n\n',0,1466935109157,1466935109157,NULL),(600025,100002,100000,100002,'hello\n\n',0,1466935124468,1466935124468,NULL),(600026,100002,100002,100002,'cool\n',0,1466935133956,1466935133956,NULL),(600027,100002,100000,100002,'冯坤  你好\n\n',0,1466935134629,1466935134629,NULL),(600028,100002,100000,100002,'哈哈  这个聊天是不是还可以？\n\n',0,1466935151739,1466935151739,NULL),(600029,100002,100002,100002,'exciting!\n\n',0,1466935191769,1466935191769,NULL),(600030,100002,100002,100002,'How to work?\n',0,1466935212908,1466935212908,NULL),(600031,100002,100000,100002,'哈哈  这个做起来比开发商家平台的应用爽多了\n\n',0,1466935225458,1466935225458,NULL),(600032,100002,100000,100002,'我打算在做手机版的聊天  pc的一般人不愿意登录\n',0,1466935254390,1466935254390,NULL),(600033,100002,100002,100002,'那是肯定的。。  一个是主动的。 一个是被动的。。。',0,1466935266753,1466935266753,NULL),(600034,100002,100000,100002,'用vue native 做  或者react native\n',0,1466935294963,1466935294963,NULL),(600035,100002,100002,100002,'用什么做的长连接？\n\n',0,1466935314854,1466935314854,NULL),(600036,100002,100000,100002,'pusher.js\n\n',0,1466935330555,1466935330555,NULL),(600037,100002,100002,100002,'聊天信息存在哪里的？\n',0,1466935356054,1466935356054,NULL),(600038,100002,100000,100002,'开源的框架  具体里面什么原理我没有研究\n\n',0,1466935360856,1466935360856,NULL),(600039,100002,100000,100002,'存在mysql里面的\n',0,1466935368684,1466935368684,NULL),(600040,100002,100002,100002,'比我们那个轮询的聊天好多了\n\n',0,1466935393700,1466935393700,NULL),(600041,100002,100000,100002,'就是推送用的\n是pusher.js',0,1466935395730,1466935395730,NULL),(600042,100002,100000,100002,'私人用没问题  企业用药收费的\n',0,1466935425542,1466935425542,NULL),(600043,100002,100002,100002,'估计底层用websocket实现的？\n\n',0,1466935469440,1466935469440,NULL),(600044,100002,100000,100002,'因为私人的推送量不大  应该是web\nsocket',0,1466935489428,1466935489428,NULL),(600045,100002,100000,100002,'我的界面还有很多没有完善  慢慢在丰富功能\n',0,1466935534785,1466935534785,NULL),(600046,100002,100002,100002,'登陆界面好酷炫啊\n',0,1466935547374,1466935547374,NULL),(600047,100002,100000,100002,'哈哈  是的吧  加了很多动画\n\n',0,1466935571356,1466935571357,NULL),(600048,100002,100000,100002,'thinkjs  真的是好用  node mvc 框架\n',0,1466935637456,1466935637456,NULL),(600049,100002,100002,100002,'在配上thinkphp。。 吊炸天\n',0,1466935795983,1466935795983,NULL),(600050,100002,100000,100002,'不用配  thinkphp能干的  thinkjs都能干\n',0,1466935845038,1466935845038,NULL),(600051,100002,100000,100002,'完全就是模仿thinkphp写的框架\n',0,1466935868632,1466935868632,NULL),(600052,100002,100000,100002,'有没有感觉js真的要一统天下了\n',0,1466935955523,1466935955523,NULL),(600053,100002,100002,100002,'哈哈 是的\n\n',0,1466936351712,1466936351712,NULL),(600054,100002,100000,100002,'你在哪呢\n\n',0,1466936367027,1466936367027,NULL),(600055,100002,100000,100002,'还在那个php大会？\n',0,1466936377382,1466936377382,NULL),(600056,100002,100000,100002,'什么时候一起去杭州啊？\n',0,1466936429897,1466936429897,NULL),(600057,100003,100003,100003,'我去',0,1466945324681,1466945324681,NULL),(600058,100003,100000,100003,'',0,1466945413557,1466945413557,NULL),(600059,100003,100000,100003,'low你妹妹\n\n\n',0,1466945422919,1466945422919,NULL),(600060,100003,100003,100003,'sss\n\n',0,1467171578320,1467171578320,NULL),(600061,100003,100000,100003,'hello world\n',0,1467171592836,1467171592836,NULL),(600062,100003,100000,100003,'肖剑锋\n',0,1467171602072,1467171602072,NULL),(600063,100003,100003,100003,'ddddddd\n\n',0,1467171608252,1467171608252,NULL),(600064,100003,100003,100003,'ssss\n\n',0,1467171676502,1467171676502,NULL),(600065,100002,100000,100002,'炳树  在不在？\n',0,1468998732880,1468998732880,NULL),(600066,100002,100000,100002,'上来了没？\n',0,1468998742718,1468998742718,NULL),(600067,100002,100002,100002,';;\n',0,1468998999386,1468998999386,NULL),(600068,100002,100002,100002,'\n',0,1468998999540,1468998999540,NULL),(600069,100002,100002,100002,'keyi \n',0,1468999003969,1468999003969,NULL),(600070,100002,100002,100002,'henqiangda\n',0,1468999006097,1468999006097,NULL),(600071,100002,100000,100002,'hello  \n',0,1468999006223,1468999006223,NULL),(600072,100002,100000,100002,'炳树\n',0,1468999012583,1468999012583,NULL),(600073,100002,100002,100002,'nb\n',0,1468999013101,1468999013101,NULL),(600074,100002,100000,100002,'哈哈\n',0,1468999022739,1468999022739,NULL),(600075,100002,100002,100002,'用node',0,1468999034036,1468999034036,NULL),(600076,100002,100002,100002,'用node',0,1468999037217,1468999037217,NULL),(600077,100002,100000,100002,'是的\n',0,1468999040489,1468999040489,NULL),(600078,100002,100002,100002,'搭的服务器吗\n',0,1468999041371,1468999041371,NULL),(600079,100002,100000,100002,'thinkjs\n',0,1468999045036,1468999045036,NULL),(600080,100002,100002,100002,'中文输入法输入英文的shihou',0,1468999053013,1468999053013,NULL),(600081,100002,100002,100002,'按enter',0,1468999057990,1468999057990,NULL),(600082,100002,100002,100002,'会直接发送\n',0,1468999061658,1468999061658,NULL),(600083,100002,100002,100002,'给你提个优化\n',0,1468999067547,1468999067547,NULL),(600084,100002,100000,100002,'kjshdfjhskdfhks\n',0,1468999072027,1468999072027,NULL),(600085,100002,100000,100002,'就是按Enter啊\n',0,1468999080714,1468999080714,NULL),(600086,100002,100000,100002,'我不优化  有bug无所谓啊  能聊天 查看聊天记录的功能都实现了\n',0,1468999104167,1468999104167,NULL),(600087,100002,100000,100002,'其他的我也不想搞了  没精力\n',0,1468999112713,1468999112713,NULL),(600088,100002,100000,100002,'我这边是管理员  可以多人聊天  你那边不行\n',0,1468999223635,1468999223635,NULL),(600089,100002,100002,100002,'给你发个文档\n',0,1468999253632,1468999253632,NULL),(600090,100002,100000,100002,'什么文档\n',0,1468999261072,1468999261072,NULL),(600091,100002,100000,100002,'用qq吧  我这里传不了文件\n',0,1468999273987,1468999273987,NULL),(600092,100002,100002,100002,'https://developer.mozilla.org/zh-CN/docs/Web/API/notification\n',0,1468999275833,1468999275833,NULL),(600093,100002,100002,100002,'链接\n',0,1468999278529,1468999278529,NULL),(600094,100002,100002,100002,'可以高端不少\n',0,1468999296035,1468999296035,NULL),(600095,100002,100000,100002,'恩 这个知道\n',0,1468999300821,1468999300821,NULL),(600096,100002,100000,100002,'通知提醒的\n',0,1468999307456,1468999307456,NULL),(600097,100002,100000,100002,'对吧\n',0,1468999309152,1468999309152,NULL),(600098,100002,100002,100002,'对\n',0,1468999333112,1468999333112,NULL),(600099,100002,100002,100002,'很适合用聊天的\n',0,1468999343480,1468999343480,NULL),(600100,100002,100002,100002,'很简单的一个api',0,1468999347785,1468999347785,NULL),(600101,100002,100002,100002,'\n',0,1468999348063,1468999348063,NULL),(600102,100002,100002,100002,'你可以玩玩\n',0,1468999350531,1468999350531,NULL),(600103,100002,100000,100002,'这个东西很多浏览器要给权限才能用\n',0,1468999353981,1468999353981,NULL),(600104,100002,100000,100002,'tower用的就是这个  对吧\n',0,1468999379131,1468999379131,NULL),(600105,100002,100002,100002,'对\n',0,1468999403378,1468999403378,NULL),(600106,100002,100002,100002,'是的\n',0,1468999408290,1468999408290,NULL),(600107,100002,100000,100002,'我先留着 以后尽量加进去\n',0,1468999414983,1468999414983,NULL),(600108,100002,100000,100002,'如果有时间的话\n',0,1468999421838,1468999421838,NULL),(600109,100002,100002,100002,'这种关系到 打扰用户 获取用户隐私的都要请求授权\n',0,1468999424386,1468999424386,NULL),(600110,100002,100002,100002,'之前看了一下 效果不错\n',0,1468999453213,1468999453213,NULL),(600111,100002,100002,100002,'只是应用场景比较少\n',0,1468999465403,1468999465403,NULL),(600112,100002,100002,100002,'看你做了 正好跟你说一下\n',0,1468999474406,1468999474406,NULL),(600113,100002,100000,100002,'恩恩  最适合对话\n',0,1468999477572,1468999477572,NULL),(600114,100002,100002,100002,'好了 下了 改bug',0,1468999482314,1468999482314,NULL),(600115,100002,100002,100002,'\n',0,1468999482620,1468999482620,NULL),(600116,100002,100000,100002,'好的\n',0,1468999486988,1468999486988,NULL),(600117,100002,100000,100002,'去吧\n',0,1468999488019,1468999488019,NULL),(600118,100003,100003,100003,'sb',0,1470225454407,1470225454407,1470225454996),(600119,100003,100003,100003,'hello\n',0,1470754474683,1470754474683,NULL),(600120,100002,100000,100002,'Hello\n',0,1470754480344,1470754480344,NULL),(600121,100003,100000,100003,'hello\n',0,1470754498998,1470754498998,NULL),(600122,100003,100000,100003,'城哥\n',0,1470754510929,1470754510929,NULL),(600123,100003,100003,100003,'just a test\n',0,1472175727496,1472175727496,NULL),(600124,100003,100003,100003,'asdf\n',0,1472809587440,1472809587440,NULL),(600125,100003,100003,100003,' 汪川大哥\n',0,1477047078507,1477047078507,NULL),(600126,100003,100003,100003,'好屌啊\n',0,1477047121386,1477047121386,NULL),(600127,100003,100000,100003,'你好 娇娇\n',0,1477047393061,1477047393061,NULL),(600128,100003,100000,100003,'hello\n',0,1477047408212,1477047408212,NULL),(600129,100003,100000,100003,'你好 娇娇\n',0,1477047416061,1477047416061,NULL),(600130,100003,100003,100003,'you bug',0,1477047420408,1477047420408,NULL),(600131,100003,100003,100003,'jkjj \n',0,1479716017118,1479716017118,NULL),(600132,100003,100003,100003,'lfds\n',0,1479716025247,1479716025247,NULL),(600133,100003,100003,100003,'hello\n',0,1484109984097,1484109984097,NULL),(600134,100003,100003,100003,'12\n',0,1491822991385,1491822991385,NULL),(600135,100003,100003,100003,'1212\n',0,1493825158017,1493825158017,NULL),(600136,100003,100003,100003,'123123\n',0,1493825177001,1493825177001,NULL),(600137,100003,100003,100003,'11111\n',0,1493825221718,1493825221718,NULL),(600138,100003,100003,100003,'121212\n',0,1493825237970,1493825237971,NULL);
/*!40000 ALTER TABLE `moment_chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moment_chatrelation`
--

DROP TABLE IF EXISTS `moment_chatrelation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moment_chatrelation` (
  `relationId` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键聊天关系id',
  `collectionId` varchar(30) NOT NULL DEFAULT '' COMMENT '聊天对象的id集合体',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`relationId`)
) ENGINE=MyISAM AUTO_INCREMENT=500000 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='聊天关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment_chatrelation`
--

LOCK TABLES `moment_chatrelation` WRITE;
/*!40000 ALTER TABLE `moment_chatrelation` DISABLE KEYS */;
/*!40000 ALTER TABLE `moment_chatrelation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moment_contact`
--

DROP TABLE IF EXISTS `moment_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moment_contact` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '姓名',
  `email` varchar(30) NOT NULL DEFAULT '' COMMENT '邮箱地址',
  `message` text COMMENT '消息',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=200001 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='联系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment_contact`
--

LOCK TABLES `moment_contact` WRITE;
/*!40000 ALTER TABLE `moment_contact` DISABLE KEYS */;
INSERT INTO `moment_contact` VALUES (200000,100003,'e12','chuan@sina.com','1212',1488377585947,1488377585947);
/*!40000 ALTER TABLE `moment_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moment_info`
--

DROP TABLE IF EXISTS `moment_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='个人简历表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment_info`
--

LOCK TABLES `moment_info` WRITE;
/*!40000 ALTER TABLE `moment_info` DISABLE KEYS */;
INSERT INTO `moment_info` VALUES (18,'Moment Wang','http://test.image.yourdream.cc/Files/76/8a/768ad6ab51b47b40a7739194a71eb00a647f317a_137258.jpg','全栈开发工程师','15001727307','chuanww@sina.com','www.chuan.com','中国上海市浦东新区陆家嘴幸福大街',NULL,'忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。',NULL,1464854576852),(15,'Moment Wang','http://test.image.yourdream.cc/Files/76/8a/768ad6ab51b47b40a7739194a71eb00a647f317a_137258.jpg','全栈开发工程师','15001727307','chuanww@sina.com','www.chuan.com','中国上海市浦东新区陆家嘴幸福大街','{\"0\":{\"startDate\":1464314124,\"endDate\":1464414124,\"position\":\"高级前端工程师\",\"company\":\"上海优梦科技\",\"description\":\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"},\"1\":{\"startDate\":1464214124,\"endDate\":1464314124,\"position\":\"全栈开发工程师\",\"company\":\"因特尔\",\"description\":\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"},\"2\":{\"startDate\":1464214124,\"endDate\":1464314124,\"position\":\"高级.NET工程师\",\"company\":\"微软\",\"description\":\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"}}',NULL,'{\"0\":{\"key\":\"Javascript\",\"value\":7},\"1\":{\"key\":\"Nodejs/Express/Thinkjs\",\"value\":5},\"2\":{\"key\":\"Html5/css3\",\"value\":6},\"3\":{\"key\":\"Angular/Vue/Backbone/Seajs/Require\",\"value\":5},\"4\":{\"key\":\".NET/C#\",\"value\":5},\"5\":{\"key\":\"Webpack/Gulp\",\"value\":5},\"6\":{\"key\":\"Mysql/Sql/Redis/MongooDb\",\"value\":4}}',1464604810347),(17,'Moment Wang','http://test.image.yourdream.cc/Files/76/8a/768ad6ab51b47b40a7739194a71eb00a647f317a_137258.jpg','全栈开发工程师','15001727307','chuanww@sina.com','www.chuan.com','中国上海市浦东新区陆家嘴幸福大街','{\"0\":{\"startDate\":1464314124,\"endDate\":1464414124,\"position\":\"高级前端工程师\",\"company\":\"上海优梦科技\",\"description\":\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"},\"1\":{\"startDate\":1464214124,\"endDate\":1464314124,\"position\":\"全栈开发工程师\",\"company\":\"因特尔\",\"description\":\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"},\"2\":{\"startDate\":1464214124,\"endDate\":1464314124,\"position\":\"高级.NET工程师\",\"company\":\"微软\",\"description\":\"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师\"}}','忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。','{\"0\":{\"key\":\"Javascript\",\"value\":7},\"1\":{\"key\":\"Nodejs/Express/Thinkjs\",\"value\":5},\"2\":{\"key\":\"Html5/css3\",\"value\":6},\"3\":{\"key\":\"Angular/Vue/Backbone/Seajs/Require\",\"value\":5},\"4\":{\"key\":\".NET/C#\",\"value\":5},\"5\":{\"key\":\"Webpack/Gulp\",\"value\":5},\"6\":{\"key\":\"Mysql/Sql/Redis/MongooDb\",\"value\":4}}',1464605934078);
/*!40000 ALTER TABLE `moment_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moment_statistic`
--

DROP TABLE IF EXISTS `moment_statistic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moment_statistic` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `liked` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '点赞人数',
  `contact` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '联系我人数',
  `day_visit` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '当日访问人数',
  `total_visit` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '总访问人数',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=400001 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='统计表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment_statistic`
--

LOCK TABLES `moment_statistic` WRITE;
/*!40000 ALTER TABLE `moment_statistic` DISABLE KEYS */;
INSERT INTO `moment_statistic` VALUES (400000,5897,2637,978,45325,1465219097630,1465219097630);
/*!40000 ALTER TABLE `moment_statistic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moment_user`
--

DROP TABLE IF EXISTS `moment_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moment_user` (
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
  `isAdmin` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否管理员',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=100004 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment_user`
--

LOCK TABLES `moment_user` WRITE;
/*!40000 ALTER TABLE `moment_user` DISABLE KEYS */;
INSERT INTO `moment_user` VALUES (100000,'Moment','User@123','Moment Wang','/static/build/images/avatar.jpg','全栈开发工程师','1500****307','chuanww@sina.com','www.chuan.com','中国上海市浦东新区陆家嘴幸福大街','一个不务正业的前端工程师，一个憧憬着全栈的小菜鸟。实习和毕业前期的摸爬，写过.NET,写过SQL Server；后期主攻前端，js,css,html必备技术，玩过Node、express、thinkjs、mysql,本站正是当下技术的产物；玩过Electron,写过跨平台桌面版应用；玩过Centos、Nginx、pm2,本站正是美帝某公司的服务器，为了便宜，真不是一般的访问慢；目前靠前端为生，是尤大的Vue.js的狂热追随者。','不会搞后端的前端不是好开发',1,1464854657175,1464854657175),(100002,'Kobe','kobe@123','Kobe Bryant','/static/build/images/kobe.jpg','NBA Start','13123456789','kobe@nba.com','www.kobe.com','美国洛杉矶Laker center','忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。','where amazing happens',0,1466082333058,1466082333058),(100003,'T-Mac','t-mac@123','Tracy McGrady','/static/build/images/t-mac.jpg','NBA Start','13123456711','t-mac@nba.com','www.t-mac.com','美国火箭队','忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。','where amazing happens',0,1466082417702,1466082417702),(100001,'Iverson','iverson@123','Allen Iverson','/static/build/images/iverson.jpg','NBA Start','13123456711','iverson@nba.com','www.iverson.com','美国76队','忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。','where amazing happens',0,1466082613985,1466082613985);
/*!40000 ALTER TABLE `moment_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moment_visit`
--

DROP TABLE IF EXISTS `moment_visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moment_visit` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ä¸»é”®id',
  `pageType` varchar(60) NOT NULL DEFAULT '' COMMENT 'é¡µé¢ç±»åž‹',
  `ip` varchar(30) NOT NULL DEFAULT '' COMMENT 'ipåœ°å€',
  `count` int(11) unsigned NOT NULL DEFAULT '0' COMMENT 'è®¿é—®æ•°',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT 'åˆ›å»ºæ—¶é—´',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT 'ä¿®æ”¹æ—¶é—´',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=900001 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='è®¿é—®è¡¨';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment_visit`
--

LOCK TABLES `moment_visit` WRITE;
/*!40000 ALTER TABLE `moment_visit` DISABLE KEYS */;
INSERT INTO `moment_visit` VALUES (900000,'business-modal-index','178.140.87.39',1488,1473172913681,1494556246605);
/*!40000 ALTER TABLE `moment_visit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moment_work`
--

DROP TABLE IF EXISTS `moment_work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moment_work` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `company` varchar(30) NOT NULL DEFAULT '' COMMENT '公司',
  `image` varchar(30) NOT NULL DEFAULT '' COMMENT '图片',
  `detail` text COMMENT '简介',
  `startTime` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '开始时间',
  `endTime` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '结束时间',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=300009 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='工作简历表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment_work`
--

LOCK TABLES `moment_work` WRITE;
/*!40000 ALTER TABLE `moment_work` DISABLE KEYS */;
INSERT INTO `moment_work` VALUES (300008,100000,'MicroSoft','/static/build/images/work3.jpg','科比是NBA最好的得分手之一，突破、投篮、罚球、三分球他都驾轻就熟，几乎没有进攻盲区，单场比赛81分的个人纪录就有力地证明了这一点。除了疯狂的得分外，科比的组织能力也很出众，经常担任球队进攻的第一发起人。另外科比还是联盟中最好的防守人之一，贴身防守非常具有压迫性。',1464857522022,1464857522022,1464857522022,1464857522022),(300006,100000,'MicroSoft','/static/build/images/work1.jpg','科比是NBA最好的得分手之一，突破、投篮、罚球、三分球他都驾轻就熟，几乎没有进攻盲区，单场比赛81分的个人纪录就有力地证明了这一点。除了疯狂的得分外，科比的组织能力也很出众，经常担任球队进攻的第一发起人。另外科比还是联盟中最好的防守人之一，贴身防守非常具有压迫性。',1464857482212,1464857482212,1464857482212,1464857482212),(300007,100000,'MicroSoft','/static/build/images/work2.jpg','科比是NBA最好的得分手之一，突破、投篮、罚球、三分球他都驾轻就熟，几乎没有进攻盲区，单场比赛81分的个人纪录就有力地证明了这一点。除了疯狂的得分外，科比的组织能力也很出众，经常担任球队进攻的第一发起人。另外科比还是联盟中最好的防守人之一，贴身防守非常具有压迫性。',1464857519139,1464857519139,1464857519139,1464857519139);
/*!40000 ALTER TABLE `moment_work` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-12  7:08:44
