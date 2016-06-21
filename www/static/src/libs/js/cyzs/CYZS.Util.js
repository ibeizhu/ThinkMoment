/**
工具方法类
*/
module.exports = {
    /**
     * @public
     * 从浏览器的地址栏获取参数
     */
    getValueFromHrefByKey:function (key) {
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
        return retval;
    },
    getHrefWithSplitKey:function(inputUrl, splitKeyList){
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
    },
    /**
     * @public
     * 格式化CDN资源的全路径
     * @cdnOptions 裁图的参数
     */
    formatImageCDNUrl:function(inputURL, cdnOptions) {
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
    },
    /**
     * 格式化dfsUrl
     * @param inputURL
     * @returns {string}
     */
    formatDFSUrl:function(inputURL) {
        var outputUrl = inputURL;
        //已经有http头的话，就不补全路径
        if(inputURL && !inputURL.match("http://")){
            outputUrl = CYZS.Config.DFS_URL + inputURL;
        }
        return outputUrl;
    },
    formatTimeStrBySeconds:function(second) {
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
    },
    /**
     * @public
     * 格式化输入的秒数为 天、时、分、秒
     * @second: 毫秒数
     */
    formatTimeObjBySeconds:function(second) {
        var retVal = {};
        //retVal.milliSecond = milliSecond % 1000;
        //milliSecond = Math.floor(milliSecond / 1000);
        retVal.second = second % 60;
        if(retVal.second < 10){
            retVal.second = "0" + retVal.second;
        }
        second = Math.floor(second / 60);
        retVal.minute = second % 60;
        second = Math.floor(second / 60);
        retVal.hour = second % 24;
        retVal.day = Math.floor(second / 24);
        return retVal;
    },
    /**
     * 根据应用内外的参数，格式化link的头
     * @param inputLink
     * @param isInApp
     * @returns {*}
     */
    formatLinkUrl:function(inputLink, isInApp) {
        if(isInApp) {
            inputLink = inputLink.replace("http://", "cyzs://");
        }else{
            inputLink = inputLink.replace("cyzs://", "http://");
        }
        return inputLink;
    },
    /**
     * @public
     * 计算和当前时间的差值，返回一个统一的时段描述，"刚刚", "几小时前","几天前"，大于7天，则显示正常的日期
     * @second:int 以秒为单位的时间
     * @return String
     */
    getDeltaTimeDisplay:function(second) {
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
    },
    /**
     * @public
     * 通过key得到URL的参数值
     * @return String
     */
    getQueryString:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return (r[2]); return null;
    },
    setATagOpenInNewTab:function(){
        $('a').each(function(){
            if(!$(this).attr('target')){
                $(this).attr('target',"_blank");
            }
        });
    },
    /*
    * 格式化时间
    * date:int,
    * format:格式化的格式
    * */
    formatDate:function(date,format){
        if (!this.isNullOrEmpty(date)) {
            date = parseInt(date);
            // 没有毫秒的处理下
            if(date < 10000000000){
                date = date*1000;
            }
            date = new Date(date);
            if (format == undefined) {
                format = "yyyy-MM-dd";
            }
            var o ={
                "M+": date.getMonth() + 1, //month
                "d+": date.getDate(),    //day
                "h+": date.getHours(),   //hour
                "m+": date.getMinutes(), //minute
                "s+": date.getSeconds(), //cond
                "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
                "S": date.getMilliseconds() //millisecond
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        }
        return "";
    },
    isNullOrEmpty:function(obj){
        if (obj == undefined || obj == null || obj == "") {
            return true;
        } else {
            return false;
        }
    }
};

