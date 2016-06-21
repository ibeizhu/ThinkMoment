/**
 * 在fis框架中没有任何意义的配置文件，会被发布过程中，覆盖
 */

if (typeof CYZS == "undefined") {
    var CYZS = {};
}

CYZS.Config = {};
CYZS.Config.BASE_API_URL = "business.php";

//用于fis发布时候，被fis替换的特殊占位字符串
CYZS.Config.URL_PROXY   = "FIS_CYZS_Config_URL_PROXY";
CYZS.Config.MAIN_HOST   = 'FIS_CYZS_Config_MAIN_HOST';
CYZS.Config.DFS_URL     = 'FIS_CYZS_Config_DFS_URL';
//=====================================

;

/**
 * Created by yeshengfei on 15/7/1.
 */

if (typeof CYZS == "undefined") {
    var CYZS = {};
}

var isDebug = true;

CYZS.Debug = function( ) {

};

/**
 * 调试弹窗
 */
CYZS.Debug.alert = function(msg) {
    try{
        if(isDebug){
            alert(msg);
        }
    }catch(e){
        console.log("CYZS Error:: CYZS_Debug.alert");
    }
};
/**
 * log的打印
 */
CYZS.Debug.log = function( ) {
    try {
        if (isDebug) {
            for(var key in arguments){
                console.log(arguments[key]);
            }
        }
    }catch(e) {
        console.log("CYZS Error:: CYZS_Debug.log");
    }
};


/**
 * Backbone.View的基础事件类
 * @constructor
 */
CYZS.BaseViewEvent = function(){};
CYZS.BaseViewEvent.EL_INIT_COMPLETE = "CYZS.BaseViewEvent.EL_INIT_COMPLETE";

_.extend(Backbone.View, Backbone.Events);

/**
 * 根视图类，一般情况非框架层级不做直接继承, 同时继承了Events的特性
 */
CYZS.BaseView = Backbone.View.extend({
    dataObj: null,  //呈现视图的最基础数据源
    tplId : null,
    INIT_VIEW_DELAY : 10,

    initialize:function(initObj) {
        if(initObj){
            this.dataObj = initObj.dataObj;
        }
        //引入一个initElView的delay处理，便于外层监听CYZS.BaseViewEvent.EL_INIT_COMPLETE事件和处理
        this.initElView();
    },

    initElView : function( ) {
        if(this.tplId) {
            var html = template(this.tplId, this.dataObj);
            this.$el.html(html);
            this.bindLazyLoad( );
        }
    },

    /**
     * 注1：此方法依赖于jquery作为selector，依赖lazyload插件
     * 注2：TODO:可以尝试在需要时动态注入这类插件
     *
     * @param selector : id或class的标示  "#idName", ".className", 用于优化搜索dom的最外层容器
     */
    bindLazyLoad:function(selector, options) {
        //有jquery，并且也有lazyload插件，则激活lazyload的插件功能
        if($ && $.fn.lazyload){
            if(!selector){
                selector = "";
            }
            //缩小selector的作用范围

            this.$el.find(selector + " img.lazy").each(function(){
                //加入一个判断，避免重复绑定
                if($(this).attr("src") == undefined){
                    $(this).lazyload({
                        //placeholder : "http://dresshelper.yourdream.cc/media/images/mobile-web2/placeholder_img1.png",
                        effect: "fadeIn",
                        threshold :300,
                        data_attribute:'src'
                    });
                }
            });
        }

    },

    /**
     * @public
     */
    elInitComplete:function( ) {
        this.trigger(CYZS.BaseViewEvent.EL_INIT_COMPLETE);
    }
});




/**
 * 大多数的模块视图的继承基类
 */
CYZS.ModuleView = CYZS.BaseView.extend({
    setPageTitle:function(title){
        if(!title){
            document.title = "穿衣助手 官方网站—每天都要美美搭！";
        }
        else{
            document.title = title;
        }
    },

    /**
     * 面包屑配置
     * @param obj
     */
    initBreadcrumb:function(obj) {
        var linksLength = 0;
        var defaultOption = {
            container :'#breadcrumb-container'
        };
        var data = $.extend({},defaultOption,obj);
        for(var key in data.links){
            linksLength++;
            if(data.links[key].link=="")
            {
                data.links[key].link="javascript:void(0);";
            }
        }
        data.linksLength = linksLength;
        var linksHtml = template('breadcrumbTpl',data);
        $(data.container).html(linksHtml);
    }
});


/**
 * 页面的入口View类
 */
CYZS.PageView = CYZS.ModuleView.extend({
    initialize:function(initObj ) {
        this.initHeader();
        this.initFooterDownloadBar();
        CYZS.ModuleView.prototype.initialize.apply(this, arguments);
        // $('.page-container').css({
        //     'min-height': (window.innerHeight - $('.header-container').height( ) - $('.footer-container').height( )) + 'px'
        // });
        this.initShare();
    },

    initShare : function( ) {
        //return;
        //如果是微信的浏览器，初始化微信的信息
        //CYZS.ShareHelper.initShare( );
    },

    initHeader : function(){
        if(!CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_APP_CYZS)){
            $(".header-common").show();
        }
    },

    initFooterDownloadBar:function(){
        if(!CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_APP_CYZS)){
            $("#downloadPop").show();
        }
    }

});




;
/**
ajax的数据请求公共类·
*/

if (typeof CYZS == "undefined") {
    var CYZS = {};
}

CYZS.AjaxHelper = function( ){

}

CYZS.AjaxHelper.ajax = function(ajaxParams, flags) {
    ajaxParams.ajaxInvokeTryCount = 0;
    ajaxParams.AJAX_MAX_TRY = 3;

    if(!ajaxParams.dataType){
        ajaxParams.dataType = "json";
    }
    //ajax的api基础url
    if(!ajaxParams.url) {
        ajaxParams.url = CYZS.Config.URL_PROXY + CYZS.Config.BASE_API_URL;
    }
    var target = CYZS.AjaxHelper.ajax.caller.caller;
    ajaxParams.success = function(data) {
        if(data){
            if(data.result == 10000){
                //未登录
                CYZS.AccountHelper.switchToUserLogin( );
                return;
            }else if(data.result == 7606){
                //已领过优惠券，给予一个弹框提示
                CYZS.Alert.show(data.msg.message);
            }else if(data.result == 200){
                if(ajaxParams.ajaxInvokeTryCount<=ajaxParams.AJAX_MAX_TRY){
                    //不必现错误，出现该错误重新请求
                    $.ajax(ajaxParams);
                }
                ajaxParams.ajaxInvokeTryCount++;
                return;

            }else if(data.result > 0){
                CYZS.Alert.show(data.msg.message);
                console.log("ajax error-> result: " + data.result + " | method: " + data.method,  data);
                return;
            }
        }
        ajaxParams.onSuccess && ajaxParams.onSuccess.apply(target, [data]);
    };

    ajaxParams.error = function(data) {
        if(data) {
            if (data.result == 10000) {
                //未登录
                CYZS.AccountHelper.switchToUserLogin( );
                return;
            }
        }
        console.log("fatal error! " , data);
        ajaxParams.onError && ajaxParams.onError.apply(target, [data]);
    };

    console.log(ajaxParams);
    //此处可以先触发一个转菊花的loading，代码待完成
    $.ajax(ajaxParams);
};
;
/**
工具方法类
*/

if (typeof CYZS == "undefined") {
    var CYZS = {};
}

CYZS.Util = function( ){};

/**
 * @public
 * 从浏览器的地址栏获取参数
 */
CYZS.Util.getValueFromHrefByKey = function (key) {
    //测试数据，实际情况是用window.location.href得到URL
    var sHref = window.location.href;
    var args = sHref.split("?");
    var retval = "";
    /*参数为空*/
    if(args[0] == sHref){
        return retval; /*无需做任何处理*/
    }
    var str = args[1];
    args = str.split("&");
    for(var i = 0; i < args.length; i++ ) {
        str = args[i];
        var arg = str.split("=");
        if(arg.length <= 1) continue;
        if(arg[0] == key) retval = arg[1];
    }
    //if(!retval){
    //    //alert('url中的' + key + '参数为空');
    //    console.log('url中的' + key + '参数为空');
    //}
    return retval;
};
CYZS.Util.getHrefWithSplitKey = function(inputUrl, splitKeyList){
    var sHref = inputUrl;
    var sharpValue = sHref.split("#")[1];
    sHref = sHref.split("#")[0];
    var args = sHref.split("?");
    var retval = "";
    /*参数为空*/
    if(args[0] == sHref){
        return sHref; /*无需做任何处理*/
    }
    var baseUrl = args[0]+"?";
    var str = args[1];
    var isFirstParam = true;
    args = str.split("&");
    
    for(var i = 0; i < args.length; i++ ) {
        str = args[i];
        var arg = str.split("=");
        if(arg.length <= 1) continue;
        if(arg[0] != "session" && arg[0] != "userId" ) {
            if(isFirstParam){
                baseUrl = baseUrl+arg[0]+"="+arg[1];
                isFirstParam = false;
            }
            else{
                baseUrl = baseUrl+"&"+arg[0]+"="+arg[1];
            }
            retval = arg[1];
        }
    }
    if(sharpValue){
        baseUrl = baseUrl+"#" + sharpValue;
    }
    return baseUrl;
};
/**
 * @public
 * 格式化CDN资源的全路径
 * @cdnOptions 裁图的参数
 */
CYZS.Util.formatImageCDNUrl = function(inputURL, cdnOptions) {
    var outputUrl = "";
    //console.log(inputURL);
    if(!inputURL){
        return "";
    }
    if(inputURL.match("http://")){
        outputUrl = inputURL;
    }else{
        outputUrl = CYZS.Config.DFS_URL + inputURL;
    }

    if(cdnOptions){
        var width = cdnOptions.width || 100;
        var quality = cdnOptions.quality || 60;
        outputUrl += "?imageMogr/v2/auto-orient/thumbnail/"+width+"x/quality/"+quality+"/format/jpg";
    }else{

    }

    return outputUrl;
};

/**
 * 格式化dfsUrl
 * @param inputURL
 * @returns {string}
 */
CYZS.Util.formatDFSUrl = function(inputURL) {
    var outputUrl = inputURL;
    //已经有http头的话，就不补全路径
    if(inputURL && !inputURL.match("http://")){
        outputUrl = CYZS.Config.DFS_URL + inputURL;
    }
    return outputUrl;
};


CYZS.Util.formatTimeStrBySeconds = function(second) {
    var timeObj = CYZS.Util.formatTimeObjBySeconds(second);
    var retVal = "";
    for(var key in timeObj){
        if(timeObj[key] < 10){
            timeObj[key] = '0' + timeObj[key];
        }
    }
    if(timeObj.day > 0){
        retVal += (timeObj.day + '天');
    }
    retVal += (timeObj.hour + '时');
    retVal += (timeObj.minute + '分');
    retVal += (timeObj.second + '秒');
    return retVal;

}

/**
 * @public
 * 格式化输入的秒数为 天、时、分、秒
 * @second: 毫秒数
 */
CYZS.Util.formatTimeObjBySeconds = function(second) {
    var retVal = {};
    //retVal.milliSecond = milliSecond % 1000;
    //milliSecond = Math.floor(milliSecond / 1000);
    retVal.second = second % 60;
    second = Math.floor(second / 60);
    retVal.minute = second % 60;
    second = Math.floor(second / 60);
    retVal.hour = second % 24;
    retVal.day = Math.floor(second / 24);
    return retVal;
};

/**
 * 根据应用内外的参数，格式化link的头
 * @param inputLink
 * @param isInApp
 * @returns {*}
 */
CYZS.Util.formatLinkUrl =  function(inputLink, isInApp) {
    if(isInApp) {
        inputLink = inputLink.replace("http://", "cyzs://");
    }else{
        inputLink = inputLink.replace("cyzs://", "http://");
    }
    return inputLink;
}

/**
 * @public
 * 计算和当前时间的差值，返回一个统一的时段描述，"刚刚", "几小时前","几天前"，大于7天，则显示正常的日期
 * @second:int 以秒为单位的时间
 * @return String
 */
CYZS.Util.getDeltaTimeDisplay = function(second) {
    var date = new Date( );
    var deltaSecond =  Math.floor(date.getTime( ) / 1000) - second;
    if(deltaSecond < 3600){
        //少于1小时，都算刚刚
        return "刚刚";
    }else if(deltaSecond < 3600 * 24){
        //少于24小时
        return Math.floor(deltaSecond / 3600) + "小时前";
    }else if(deltaSecond < 3600 * 24 * 7) {
        //少于7天
        return Math.floor(deltaSecond / (3600 * 24)) + "天前";
    }else{
        var date = new Date(second * 1000);
        return (date.getMonth() + 1)  + "月" +  date.getDate() + "日";
    }
}

/**
 * @public
 * 通过key得到URL的参数值 
 * @return String
*/
CYZS.Util.getQueryString = function(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
   var r = window.location.search.substr(1).match(reg);
   if (r!=null) return (r[2]); return null;
}

///日期时间格式化
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    Date.prototype.format=function(time){
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(time)){
            time = time.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o){
            if (new RegExp("(" + k + ")").test(time)){
                time = time.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return time;
    };

CYZS.Util.setATagOpenInNewTab = function(){
    $('a').each(function(){
        if(!$(this).attr('target')){
            $(this).attr('target',"_blank");
        }
    });
};
;
if (typeof CYZS == "undefined") {
    var CYZS = {};
}

CYZS.UrlHelper = function(){
};


CYZS.UrlHelper.URL_SUIT_DETAIL = 'suit_detail'; //商品详情页
CYZS.UrlHelper.URL_SHOPKEEPER = 'shopkeeper';



CYZS.UrlHelper.URL_DICT = {}
CYZS.UrlHelper.URL_DICT[CYZS.UrlHelper.URL_SUIT_DETAIL] = 'pc/page/core/suit/index.html?viewUserId={viewUserId}&suitId={suitId}';
CYZS.UrlHelper.URL_DICT[CYZS.UrlHelper.URL_SHOPKEEPER] = 'pc/page/shop_owner/index.html?viewUserId={viewUserId}';

/**
 * 获取url路径配置
 * @param pageName
 * @param params
 * @returns {String}
 */
CYZS.UrlHelper.getUrl = function(pageName, params) {
    var pageUrl =  CYZS.UrlHelper.URL_DICT[pageName];
    for(var key in params) {
        pageUrl = pageUrl.replace('{' +key+'}', params[key]);
    }
    pageUrl = '/'+ pageUrl;
    return pageUrl;
}


//BusinessDataHelper的公共方法是否需要绝对全局，后续再斟酌
/**
 * 公共的基础数据处理方法，主要针对suit、goods这样的字段
 */
if (typeof CYZS == "undefined") {
    var CYZS = {};
}

CYZS.BusinessDataHelper = function( ) {

};

/**
 * 搭配数据结构的通用处理
 * @param inputObj
 * @param option
 * @returns {*}
 */
CYZS.BusinessDataHelper.formatSuitData = function(inputObj, option) {
    var value = inputObj;
    //调用公共属性处理
    value = CYZS.BusinessDataHelper.formatCommonProp(value);

    value.avatar = CYZS.Util.formatDFSUrl(value.avatar);
    value.publishTime = CYZS.Util.getDeltaTimeDisplay(value.time);
    //处理标签
    var markList = value.markList;
    for (var key in markList) {
        var markInfoObj = markList[key];
        markList[key].left = markInfoObj.x / 100 * value.imageActualWidth;
        markList[key].top = (markInfoObj.y / 100) * (value.imageActualWidth / value.width * value.height) - 20;
        //标签的朝向
        //tagWidth字段为了解决安卓设备下，因为标签的缘故，撑大了容器，导致底部的toolbar坐标错乱，ios正常
        if(markInfoObj.direction == "right"){
            markList[key].isDirLeft = false;
            markList[key].tagWidth = (markList[key].left) + "px";
        }else{
            markList[key].isDirLeft = true;
            markList[key].tagWidth = (value.imageActualWidth - markList[key].left) + "px";
        }
    }
    return value;
};

/**
 * 单品数据结构的通用处理
 * @param inputObj
 * @param option
 */
CYZS.BusinessDataHelper.formatGoodsData = function(inputObj, option) {
    var value = inputObj;
    //调用公共属性处理
    value = CYZS.BusinessDataHelper.formatCommonProp(value);
    return value;
};

CYZS.BusinessDataHelper.formatCommonProp = function(inputObj, option) {
    var value = inputObj;
    //计算图片的实际高度
    if(value.imageActualWidth) {
        value.imageActualHeight = value.imageActualWidth / value.width * value.height;
    }
    if(value.price !=undefined&& value.price != value.originalPrice){
        value.discount = (value.price * 10 / value.originalPrice).toFixed(1);
        var toSplitNum = value.discount;
        var splitedNum = toSplitNum.split('.');
        if(splitedNum[1]==0){
            //去整数折扣的 '.0' 最后浮点
            value.discount = splitedNum[0];
        }
    }
    value.image = CYZS.Util.formatDFSUrl(value.image);
    return value;
};

;
/**
 * Created by bingshu on 15/9/4.
 */
if (typeof CYZS == "undefined") {
    var CYZS = {};
}
if (typeof CYZS.BrowserHelper == "undefined") {
    CYZS.BrowserHelper = {};
}
CYZS.BrowserHelper.BROWSER_TYPE_IE = 'microsoft internet explorer';
CYZS.BrowserHelper.BROWSER_TYPE_IE6 = 'msie 6.0';
CYZS.BrowserHelper.BROWSER_TYPE_IE7 = 'msie 7.0';
CYZS.BrowserHelper.BROWSER_TYPE_IE8 = 'msie 8.0';
CYZS.BrowserHelper.BROWSER_TYPE_CHROME = 'chrome';
CYZS.BrowserHelper.BROWSER_TYPE_NETSCAPE = 'netscape';
CYZS.BrowserHelper.BROWSER_TYPE_OPERA = 'opera';
CYZS.BrowserHelper.BROWSER_TYPE_FIREFOX = 'firefox';
CYZS.BrowserHelper.BROWSER_TYPE_MOBILE_ANDROID = 'android';
CYZS.BrowserHelper.BROWSER_TYPE_MOBILE_IPHONE = 'iphone';
CYZS.BrowserHelper.BROWSER_TYPE_MOBILE_IPAD = 'ipad';
CYZS.BrowserHelper.BROWSER_TYPE_APP_CYZS = 'app/cyzs';
CYZS.BrowserHelper.BROWSER_TYPE_WE_CHAT = 'micromessenger';


CYZS.BrowserHelper.checkDict = null;
/**
 * 检测是否特定浏览器
 * @param type
 * @returns {boolean}
 * @constructor
 */
CYZS.BrowserHelper.check = function(type){
    if(type == CYZS.BrowserHelper.BROWSER_TYPE_IE) {
        return (navigator.appName.toLowerCase().indexOf(type) != -1 && document.all);
    }else if(type == CYZS.BrowserHelper.BROWSER_TYPE_OPERA) {
        return (navigator.appName.toLowerCase().indexOf(type) != -1);
    }else{
        return (navigator.userAgent.toLowerCase().indexOf(type) != -1);
    }
};

/**
 * @private
 */
CYZS.BrowserHelper.getCheckDict = function( ) {
    if(CYZS.BrowserHelper.checkDict){
        var dict = {};
        dict[CYZS.BrowserHelper.BROWSER_TYPE_IE] = navigator.appName.indexOf("Microsoft Internet Explorer") != -1 && document.all;
        dict[CYZS.BrowserHelper.BROWSER_TYPE_IE6] = (navigator.userAgent.split(';')[1].toLowerCase().indexOf("msie 6.0") == "-1" ? false : true);
        dict[CYZS.BrowserHelper.BROWSER_TYPE_IE7] = (navigator.userAgent.split(';')[1].toLowerCase().indexOf("msie 7.0") == "-1" ? false : true);
        dict[CYZS.BrowserHelper.BROWSER_TYPE_IE8] = (navigator.userAgent.split(';')[1].toLowerCase().indexOf("msie 8.0") == "-1" ? false : true);
        dict[CYZS.BrowserHelper.BROWSER_TYPE_CHROME] = (navigator.userAgent.indexOf("Chrome") > -1);
        dict[CYZS.BrowserHelper.BROWSER_TYPE_NETSCAPE] = (navigator.userAgent.indexOf("Netscape") != -1);
        dict[CYZS.BrowserHelper.BROWSER_TYPE_OPERA] = (navigator.appName.indexOf("Opera") != -1);
        dict[CYZS.BrowserHelper.BROWSER_TYPE_FIREFOX] = (navigator.userAgent.indexOf("Firefox") != -1);
        dict[CYZS.BrowserHelper.BROWSER_TYPE_MOBILE_ANDROID] = (navigator.userAgent.toLowerCase().indexOf('android') != -1);
        dict[CYZS.BrowserHelper.BROWSER_TYPE_MOBILE_IPHONE] = (navigator.userAgent.toLowerCase().indexOf('iphone') != -1);
        dict[CYZS.BrowserHelper.BROWSER_TYPE_MOBILE_IPAD] = (navigator.userAgent.toLowerCase().indexOf('ipad') != -1);
        dict[CYZS.BrowserHelper.BROWSER_TYPE_APP_CYZS] = (navigator.userAgent.toLowerCase().indexOf('app/cyzs') != -1);
        CYZS.BrowserHelper.checkDict = dict;
    }
    return CYZS.BrowserHelper.checkDict;
}




/**
 * @public 是否移动端浏览器
 * TODO:此处的判定条件可能太少
 * @returns {*}
 */
CYZS.BrowserHelper.checkIsMobile = function( ) {
    var retVal =  (CYZS.BrowserHelper.Check(CYZS.BrowserHelper.BROWSER_TYPE_APP_IPHONE)
                || CYZS.BrowserHelper.Check(CYZS.BrowserHelper.BROWSER_TYPE_APP_IPAD)
                || CYZS.BrowserHelper.Check(CYZS.BrowserHelper.BROWSER_TYPE_APP_ANDROID));
    return retVal;
}





///**
// * 识别是否移动浏览器
// * @return	boolean
// */
//public static function detectMobileBrowser()
//{
//    if( preg_match( '/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|ad|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i', $_SERVER['HTTP_USER_AGENT'] )
//        || preg_match( '/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i' , substr( $_SERVER['HTTP_USER_AGENT'] , 0 , 4 ) ) )
//    {
//        return true;
//    }
//
//    return false;
//};
if(typeof CYZS == "undefined") {
    var CYZS = {};
}
if(typeof CYZS.WebViewJs == "undefined") {
    CYZS.WebViewJs = {};
}

if (typeof cyzs == "undefined") {
    var cyzs = {};
}
if (typeof cyzs.webview == "undefined") {
    cyzs.webview = {};
    cyzs.webview.init = function ( ) {}
    //初始一个占位的默认方法
    cyzs.webview.leave
    = cyzs.webview.share
    = cyzs.webview.goBack
    = cyzs.webview.rightButtonAction
    = cyzs.webview.rightButton2Action = function( ) {

    }
}

CYZS.WebViewJs = {
    METHOD_SHARE : "share",                             //普通分享
    METHOD_MANAGE_LOCAL_NOTICE : "manageLocalNotice",   //调用本地的通知
    METHOD_SETUP_UI : "setupUI",                        //配置native的ui界面
    METHOD_CLOSE : "close",                             //关闭
    METHOD_SHARE_SHOP_PIC : "shareShopPic",             //分享店铺的图片
    METHOD_SHARE_SUIT_PIC : "shareSuitPic",             //分享搭配的图片
    METHOD_SHARE_GOODS_PIC : "shareGoodsPic",             //分享搭配的图片
    METHOD_SHARE_PICTURE : "sharePicture",              //分享一张特定的图片

    INIT_METHOD_NATIVE_SHARE : 'nativeShare',




    init: function ( ) {
        var that = this;
        cyzs.webview.init = function (option) {
            if(option){
                if (option.nativeLeave) {
                    that.nativeLeave(option.nativeLeave);
                }
                if (option.nativeShare) {
                    that.nativeShare(option);
                }
                if (option.nativeGoBack) {
                    that.nativeGoBack(option.nativeGoBack);
                }
                if (option.nativeRightButtonAction) {
                    that.nativeRightButtonAction(option);
                }
                if (option.nativeRightButton2Action) {
                    that.nativeRightButton2Action(option);
                }
            }
        }
    },
    /**
     * @public 初始本地js代码被app调用的方法
     */
    initMethodCalledByNative : function(method, option) {
        if(CYZS.WebViewJs[method]){
            CYZS.WebViewJs[method].apply(CYZS.WebViewJs, [option]);
        }
    },

    /**
     * @public
     * ※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※
     *
     *              web调用nativeWebview的新的通用统一入口，以后只需要调用这一个接口即可
     *
     * ※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※
     * @param method
     * @param option
     */
    callNativeByMethod : function(method, option) {
        //如有需要，使用如一些默认参数填补
        var defaultParams = this.getDefaultParamsByMethod(method);
        var params = $.extend({}, defaultParams, option);
        var oldApiFuncName = null;
        //如果客户端没有invoke方法，则走老接口的方法
        if(window.cyzsNative && !window.cyzsNative.invoke){
            oldApiFuncName = this.getOldFuncNameByMethod(method);
        }

        this.nativeJsInvoke(method, params, oldApiFuncName);
    },


    /**
     * webView调用客户端分享接口
     * @param option
     */
    webShare:function(option) {
        var obj = {
            "platform" : "" ,
            "content":"",
            "title" : "",
            "imageUrl":"",
            "shareLink":"",
            "callbackName" : "cyzs.test"
        }
        obj = $.extend({},obj,option);

        //window.cyzsNative.share(obj);
        this.nativeJsInvoke(this.METHOD_SHARE, obj, "share");
    },

    /**
     * webView设置客户端UI
     * @param option
     */
    webSetUi:function(option) {
        var obj = {
            "title":"",
            "rightButtonStyle":"",
            "rightButton2Style":"",
            "leftButtonStyle":"",
            "showCloseButton":"",
            "callbackName" : "cyzs.test"
        };
        obj = $.extend({},obj,option);
        //window.cyzsNative.setupUI(JSON.stringify(option));
        this.nativeJsInvoke(this.METHOD_SETUP_UI, obj, "setupUI");
    },
    /**
     * webView设置客户端通知接口
     * @param option
     */
    webManageLocalNotice:function(option) {
        var obj = {
            content: "",
            actionType: 1, //1为提醒，0为查询 2为删除
            parseLink: "",
            randRange: 0,
            noticeName: "signinLock",
            startTime: 0,
            repeatType: 2,
            badgeNumber: 1,
            badgeNumberAndroid: 1
        }
        obj = $.extend({},obj,option);
        //window.cyzsNative.manageLocalNotice(JSON.stringify(obj));
        this.nativeJsInvoke(this.METHOD_MANAGE_LOCAL_NOTICE, obj, "manageLocalNotice");
    },




    /**
     * 客户端调用webView离开webView
     * @return 'false'表示不可以关闭 其他(包括默认)表示可以关闭
     */
    nativeLeave:function(option) {
        cyzs.webview.leave = function(){
            var obj = {
                isLeave:false,
                callBack:null
            }
            obj = $.extend({},obj,option);
            window.cyzsNative && window.cyzsNative.leaveJSCallBack && window.cyzsNative.leaveJSCallBack(JSON.stringify(obj.isLeave));
            obj.callBack && obj.callBack();
            return JSON.stringify(obj.isLeave);
        }
    },
    /**
     * 客户端调用webView设置分享
     */
    nativeShare:function(option) {
        cyzs.webview.share = function () {
            var obj = {
                "content": "",
                "title": "",
                "imageUrl": "",
                "shareLink": ""
                //"callbackName" : "cyzs.test"
            }
            obj = $.extend({},obj,option);
            window.cyzsNative && window.cyzsNative.shareJSCallBack && window.cyzsNative.shareJSCallBack(JSON.stringify(obj));
            return JSON.stringify(obj);
        };
    },
    /**
     * 客户端调用webView设置是否可以后退
     * @return 'false'表示不可以关闭 其他(包括默认)表示可以关闭
     */
    nativeGoBack:function(option) {
        cyzs.webview.goBack = function(){
            var obj = {
                isGoBack:false,
                callBack:null
            }
            obj = $.extend({},obj,option);
            window.cyzsNative && window.cyzsNative.goBackJSCallBack && window.cyzsNative.goBackJSCallBack(JSON.stringify(obj.isGoBack));
            obj.callBack && obj.callBack();
            return JSON.stringify(obj.isGoBack);
        }
    },
    /**
     * 客户端调用webView设置右上角第一个按钮事件
     */
    nativeRightButtonAction:function(option) {
        cyzs.webview.rightButtonAction = function(int){
            var obj = {
                num1:{
                    isRightButtonAction:false,
                    callBack:null
                }
            }
            obj = $.extend({},obj,option);
            var isReturn = false;
            if(obj["num"+int]) {
                isReturn = obj["num"+int].isRightButtonAction;
            }
            if(isReturn) {
                obj["num"+int].callBack && obj["num"+int].callBack();
            }
            window.cyzsNative && window.cyzsNative.rightButtonActionJSCallBack && window.cyzsNative.rightButtonActionJSCallBack(JSON.stringify(isReturn));
            return JSON.stringify(isReturn);
        }
    },
    /**
     * 客户端调用webView设置右上角第二个按钮事件
     */
    nativeRightButton2Action:function(option) {
        cyzs.webview.rightButton2Action = function(int){
            var obj = {
                num1:{
                    isRightButtonAction:false,
                    callBack:null
                }
            }
            obj = $.extend({},obj,option);
            var isReturn = false;
            if(obj["num"+int]) {
                isReturn = obj["num"+int].isRightButtonAction;
            }
            if(isReturn) {
                obj["num"+int].callBack && obj["num"+int].callBack();
            }
            window.cyzsNative && window.cyzsNative.rightButton2ActionJSCallBack && window.cyzsNative.rightButton2ActionJSCallBack(JSON.stringify(isReturn));
            return JSON.stringify(isReturn);
        }
    },


    /**
     * @private
     * 本对象内部和native互通的通道代码
     *
     * @param method
     * @param params
     * @param oldApiFunc
     */
    nativeJsInvoke:function(method, params, oldApiFuncName) {
        //是新的api，或者没有旧的api接口，则调用新接口
        if(oldApiFuncName){
            //console.log("old api");
            //console.log(params);
            //老的旧有api的调用
            params = JSON.stringify(params);
            window.cyzsNative && window.cyzsNative[oldApiFuncName] &&  window.cyzsNative[oldApiFuncName](params);
        }else{
            var invokeObj = {
                method: method,
                params: params,
                callbackName: params.callbackName
            }
            //console.log("new api");
            //console.log(invokeObj.method);
            //console.log(invokeObj.params);
            //新的api接口调用
            invokeObj = JSON.stringify(invokeObj);
            window.cyzsNative && window.cyzsNative.invoke && window.cyzsNative.invoke(invokeObj);
        }
    },

    /**
     * @private
     * 初始化不同method的默认参数
     */
    getDefaultParamsByMethod:function(method) {
        if(!this.defaultParamsDict){
            var defaultParamsDict = {};
            defaultParamsDict[this.METHOD_SHARE] = {
                "platform" : "" ,
                "content":"",
                "title" : "",
                "imageUrl":"",
                "shareLink":""
            };
            defaultParamsDict[this.METHOD_SETUP_UI] = {
                "title":"",
                "rightButtonStyle":"",
                "rightButton2Style":"",
                "leftButtonStyle":"",
                "showCloseButton":""
            };
            defaultParamsDict[this.METHOD_MANAGE_LOCAL_NOTICE] = {
                content: "",
                actionType: 1, //1为提醒，0为查询 2为删除
                parseLink: "",
                randRange: 0,
                noticeName: "signinLock",
                startTime: 0,
                repeatType: 2,
                badgeNumber: 1,
                badgeNumberAndroid: 1
            };
            defaultParamsDict[this.METHOD_SHARE_SHOP_PIC] = {

            };
            defaultParamsDict[this.METHOD_SHARE_SUIT_PIC] = {
                //"moon":1111       //可以追加任意默认缺省数据
            };
            this.defaultParamsDict = defaultParamsDict;
        }
        var retVal = this.defaultParamsDict[method];
        if(!retVal){
            retVal = {};
        }
        return retVal;
    },

    /**
     * @private
     * 在window.cyzsNative.invoke的方法并不存在的时候，吐出一个老接口的方法
     * @param method
     */
    getOldFuncNameByMethod:function(method) {
        if(!this.oldFuncNameDict){
            var oldFuncNameDict = {};
            oldFuncNameDict[this.METHOD_SHARE] = "share";
            oldFuncNameDict[this.METHOD_SETUP_UI] = "setupUI";
            oldFuncNameDict[this.METHOD_MANAGE_LOCAL_NOTICE] = "manageLocalNotice";
            this.oldFuncNameDict = oldFuncNameDict;
        }

        var retVal = this.oldFuncNameDict[method];
        if(!retVal){
            retVal = null;
        }
        return null;
    }
}

/**
 * 味道有点古怪的原生cyzs.webview.init的方法初始
 * 注册init方法
 */
//CYZS.WebViewJs.init();

;
if(typeof CYZS == "undefined") {
    CYZS = {};
}
if(typeof CYZS.ShareHelper == "undefined") {
    CYZS.ShareHelper = {
        PLATFORM_DEFAULT : 0,
        PLATFORM_WECHAT_MSG : 1,
        PLATFORM_WECHAT_TIMELINE : 2,
        PLATFORM_WEI_BO : 4,
        PLATFORM_QQZONE : 3,
        PLATFORM_QQ : 5,

        /**
         * @private
         */
        shareConfig : null,
        isWXReady : false,  //标记微信是否ready



        /**
         * @public
         * (配置型接口)
         * 在微信等活动页最常用的分享配置的方法
         * 自动根据所属平台，改变和配置分享信息，待后续目标webview进行后续的分享交互
         * @param config
         */
        setShareConfig : function(config) {
            CYZS.ShareHelper.shareConfig = config;
            //如果是应用内，配置右上角的分享按钮信息
            if(CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_APP_CYZS)) {
                CYZS.WebViewJs.initMethodCalledByNative(CYZS.WebViewJs.INIT_METHOD_NATIVE_SHARE, config);
            }else if(CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_WE_CHAT)){
                if(CYZS.ShareHelper.isWXReady){
                    //如果微信的配置已经ok，那么设置微信要分享的信息
                    CYZS.ShareHelper.setWeChatShareConfig(config);
                }else{
                    //微信未ready，通过ajax获取分享的微信授权签名
                    var params = {
                        data: {
                            method:'index.getWeChatSignPackage'
                        },
                        onSuccess:function(data) {
                            //CYZS.Alert.show('wxconfig ajax success');
                            //合并了
                            var wxConfig = _.extend({}, data.data, {
                                debug : false,
                                jsApiList: [
                                    "onMenuShareTimeline",
                                    "onMenuShareAppMessage",
                                    "onMenuShareQQ",
                                    "onMenuShareWeibo"
                                ]
                            });
                            CYZS.ShareHelper.initWeChatConfig(wxConfig);
                        }
                    }
                    //是微信浏览器
                    CYZS.AjaxHelper.ajax(params);
                }
            }
        },

        /**
         * @public
         * (主动调用型接口)
         * 手动调用分享所使用的方法，包括web调用原生，或者修改第三方webview的分享参数
         * @param platform
         * @param shareInfoObj
         */
        share : function(shareInfoObj,platform) {
            //检测是否为应用内
            if(CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_APP_CYZS)){
                //如果app内平台的参数不传，则调用默认平台
                if(!platform){
                    platform = CYZS.ShareHelper.PLATFORM_DEFAULT;
                }
                var invokeObj = _.extend({}, shareInfoObj, {platform: platform});
                CYZS.WebViewJs.callNativeByMethod(CYZS.WebViewJs.METHOD_SHARE, invokeObj);
            }else if(CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_WE_CHAT)){
                CYZS.ShareHelper.setShareConfig(shareInfoObj);
            }
        },



        /**
         * ============================     private below    ===================================
         */

        /**
         * @private
         * 初始化微信的config，config配置需要从服务端获取
         */
        initWeChatConfig : function(wxConfig){
            //return;
            //是否微信浏览器
            if(CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_WE_CHAT)){
                //初始化微信的配置
                wx.config(wxConfig);
                //注册wx的ready方法
                wx.ready(function () {
                    CYZS.ShareHelper.isWXReady = true;
                    //alert('ready');
                    //分享到朋友圈
                    //此时有可能config的配置数据请求到了，但是，分享的CYZS.ShareHelper.shareConfig还没值
                    if(CYZS.ShareHelper.shareConfig) {
                        CYZS.ShareHelper.setWeChatShareConfig(CYZS.ShareHelper.shareConfig);
                    }
                });
                wx.error(function (res) {
                    //alert(JSON.stringify(res));
                    CYZS.Alert.show(JSON.stringify(res));
                });
            }
        },


        /**
         * @private
         * @param config
         */
        setWeChatShareConfig : function(config) {
            if(config && CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_WE_CHAT)){
                var that = this;
                var shareConfig = {
                    title: config.title, //分享标题
                    link: config.shareLink, //分享链接
                    imgUrl: config.imageUrl, //分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        //that.callbackName && that.callbackName();
                    },
                    cancel: function () {
                    }
                };
                //CYZS.Alert.show('set share title '+ shareConfig.title);
                wx.onMenuShareTimeline(
                    $.extend({}, shareConfig, {
                        trigger: function (res) {
                            //alert('用户点击分享到朋友圈');
                        }
                    }));
                //分享给朋友
                wx.onMenuShareAppMessage($.extend({}, shareConfig, {
                    desc: config.content,
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
                }));
                //分享到QQ
                wx.onMenuShareQQ($.extend({}, shareConfig, {
                    desc: config.content
                }));
                //分享到腾讯微博
                wx.onMenuShareWeibo($.extend({}, shareConfig, {
                    desc: config.content
                }));
            }
        }
    };
}
;

if (typeof CYZS == "undefined") {
    var CYZS = {};
}

CYZS.Alert = function( ){

};

CYZS.Alert.$alert = null;

/**
 * public
 * @param msg
 */
CYZS.Alert.show = function(msg) {
    CYZS.Alert.remove( );

    var alertDom = '<div id="js_cyzsAlertWrap">'
            + msg
            + '</div>';
    $('.js-page-wrap').append(alertDom);



    $alert = $('#js_cyzsAlertWrap');

    $alert.css({
        'color':'#fff',
        'background': 'rgba(0,0,0,0.7)',
        'border-radius': '5px',
        'position' : 'fixed',
        'bottom' : '40px',
        'max-width': '300px',
        'padding': '5px 10px',
        'left' : '50%',
        'z-index' : 10000,
        'display' : 'none'
    });

    $alert.css({
        'margin-left' : (-($alert.width() / 2)) + 'px'
    });

    $alert.fadeIn(1000);
    $alert.interval = setInterval(function( ) {
        $alert.fadeOut(1000, function( ) {
            CYZS.Alert.remove( );
        });
    }, 2000);
    CYZS.Alert.$alert = $alert;
};


/**
 * @private
 */
CYZS.Alert.remove = function( ) {
    var $alert = CYZS.Alert.$alert;
    if(CYZS.Alert.$alert) {
        clearInterval($alert.interval);
        $alert.remove( );
        CYZS.Alert.$alert = null;
    }
};

/**
 * ============================================================================================================
 *
 *        高危脚本，【必须】【必须】【必须】被引入，用于过滤生成客户端webview的安全url链接
 *
 * ============================================================================================================
 */
/**
 * ============================================================================================================
 *
 *        高危脚本，必须被引入，用于过滤生成客户端webview的安全url链接
 *
 * ============================================================================================================
 */


if (typeof CYZS == "undefined") {
    var CYZS = {};
};

CYZS.AccountHelper = function( ){

};

/**
 * @public
 * 在app内的时候，才检测是否链接中是否带有userId和session，带有的话，需要做一些处理，并且最终跳转到不带信息的安全链接
 *
 */
CYZS.AccountHelper.checkAppLogin = function( ) {
    if(CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_APP_CYZS)) {
        var session = CYZS.Util.getValueFromHrefByKey('session');
        var userId = CYZS.Util.getValueFromHrefByKey('userId');
        if(!Cookies.get('_userId')){
            //如果是在app内，则发送一个userId和session的请求，success后，刷新页面
            if(session && userId) {
                //应用内未登录，通过服务端来实现一个跳转来set cookie
                window.location.replace(
                    '/?method=index.autoLogin'
                    + '&cyzsSession=' + session
                    + '&cyzsUserId=' + userId
                    + '&callbackURL=' + CYZS.Util.getHrefWithSplitKey(window.location.href)
                );
            }else{
            }
        }else{
            if(session && userId) {
                CYZS.AccountHelper.switchToAppSafeUrl();
            }
        }
    }
}

/**
 * 检测带session和userId的安全连接
 */
CYZS.AccountHelper.checkSafeLink =function( ) {
    var session = CYZS.Util.getValueFromHrefByKey('session');
    var userId = CYZS.Util.getValueFromHrefByKey('userId');
    if(session && userId) {
        if(Cookies.get('_userId') && Cookies.get('_userId')==userId){
            CYZS.AccountHelper.switchToAppSafeUrl();
        }else{
            //先登录
            window.location.replace(
                '/?method=index.autoLogin'
                + '&cyzsSession=' + session
                + '&cyzsUserId=' + userId
                + '&callbackURL=' + CYZS.Util.getHrefWithSplitKey(window.location.href)
            );
        }
    }
}

/**
 * @public
 * app外检测是否web有登录
 */
CYZS.AccountHelper.checkLogin = function( ) {
    if(!CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_APP_CYZS)){
        if (!Cookies.get('_userId')) {
            //跳转到登录页
            CYZS.AccountHelper.switchToUserLogin( );
        }
    }
};

/**
 * @public 跳转到统一的登录页面
 */
CYZS.AccountHelper.switchToUserLogin = function( ) {
    if(CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_APP_CYZS)){
        window.location.replace('cyzs://login?refresh=1');
    }
    else{        
        window.location.replace(CYZS.Config.MAIN_HOST +'/?method=user.mLogin&callbackURL=' + CYZS.Util.getHrefWithSplitKey(window.location.href));
    }
};


/**
 * @private 跳转到对于app而言的安全链接，不带userId和session
 */
CYZS.AccountHelper.switchToAppSafeUrl = function( ) {
    window.location.replace(CYZS.Util.getHrefWithSplitKey(window.location.href));
};



/**
 * ============================================================================================================
 *
 *        【注意】！！！此方法再类库被引入后，一定要执行一次，转化app端的webview链接为最终不带userId和session的安全链接
 *
 * ============================================================================================================
 */
CYZS.AccountHelper.checkSafeLink( );
/**
 *  ===============================  【注意】checkSafeLink引入后就立即调用了   ====================================
 */;
/**
 * ============================================================================================================
 */