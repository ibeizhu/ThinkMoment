/**
 * Created by Moment on 16/6/21.
 */
// 工具类
module.exports={
    /**
     * 检查对象为空
     * @param obj
     * @returns {boolean}
     */
    isNullOrEmpty:function (obj) {
        if (obj == undefined || obj == null || obj == "") {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 格式化日期
     * @param date
     * @param format
     * @returns {*}
     */
    formatDate:function (date,format) {
        if (!this.isNullOrEmpty(date)) {
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
    /**
     * 绑定图片加载失败事件
     */
    bindImgLoadError:function () {
        $('img').each(function(){
            var error = false;
            if (!this.complete) {
                error = true;
            }

            if (typeof this.naturalWidth != "undefined" && this.naturalWidth == 0) {
                error = true;
            }

            if(error){
                $(this).bind('error.replaceSrc',function(){
                    this.src = "/static/build/images/defaultUser.jpeg";

                    $(this).unbind('error.replaceSrc');
                }).trigger('load');
            }
        });
    }
};