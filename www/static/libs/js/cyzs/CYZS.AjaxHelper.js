/**
 * Created by Administrator on 2016/1/20.
 */
/**
 ajax的数据请求公共类·
 */
if (typeof CYZS == "undefined") {
    var CYZS = {};
}
if(typeof module !== "undefined") {
    var webpackConfig = require("../../../../../../webpackConfig");
}
CYZS.AjaxHelper = function( ){

};

CYZS.AjaxHelper.ajax = function(ajaxParams, flags) {
    ajaxParams.ajaxInvokeTryCount = 0;
    ajaxParams.AJAX_MAX_TRY = 3;

    if(!ajaxParams.dataType){
        ajaxParams.dataType = "json";
    }
    //ajax的api基础url
    //if(!ajaxParams.url) {
    //    ajaxParams.url = 'business.php';
    //}
    if(typeof module !== "undefined") {
        if(ajaxParams.url.indexOf("admin.php") > -1 ) {
            ajaxParams.url = ajaxParams.url.replace("admin.php","");
            ajaxParams.url = webpackConfig.MAIN_AJAXHOST + webpackConfig.URL_PROXY_ADMIN +ajaxParams.url;
        } else if(ajaxParams.url.indexOf("business.php") > -1 ) {
            ajaxParams.url = ajaxParams.url.replace("business.php","");
            ajaxParams.url = webpackConfig.MAIN_AJAXHOST + webpackConfig.URL_PROXY_BUSINESS +ajaxParams.url;
        } else {
            ajaxParams.url = webpackConfig.MAIN_AJAXHOST + webpackConfig.URL_PROXY_BUSINESS +ajaxParams.url;
        }

    }
    var target = CYZS.AjaxHelper.ajax.caller.caller;
    if(flags){
        if(flags.target) {
            target = flags.target;
        }
    }
    ajaxParams.success = function(data) {
        //对于一些特殊的希望中断后续逻辑的，在if中需要加入return，无视后续的onSuccess注册
        if(data){
            if(data.result == 200){
                if(ajaxParams.ajaxInvokeTryCount<=ajaxParams.AJAX_MAX_TRY){
                    //不必现错误，出现该错误重新请求
                    $.ajax(ajaxParams);
                }
                ajaxParams.ajaxInvokeTryCount++;
                return;
            }else if(data.result > 0){
                if(data.msg && data.msg.message ){
                    alert(data.msg.message);
                }else if(data.message){
                    alert(data.message);
                }
                ajaxParams.onError && ajaxParams.onError.apply(target, [data]);
                console.log("ajax success but error-> result: " + data.result + " | method: " + data.method,  data);
                return;
            }
        }
        ajaxParams.onSuccess && ajaxParams.onSuccess.apply(target, [data]);
    };

    ajaxParams.error = function(data) {
        if(data) {
            if(data.msg && data.msg.message ){
                alert(data.msg.message);
            }else if(data.message){
                alert(data.message);
            }
        }
        console.log("fatal error! " , data);
        ajaxParams.onError && ajaxParams.onError.apply(target, [data]);
    };
    //此处可以先触发一个转菊花的loading，代码待完成
    $.ajax(ajaxParams);
};
if(typeof module !== "undefined") {
    module.exports = CYZS.AjaxHelper.ajax;
}
