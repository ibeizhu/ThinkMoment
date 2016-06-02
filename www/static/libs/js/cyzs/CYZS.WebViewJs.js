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
    METHOD_UPLOAD_PICTURE:'uploadPicture',              //上传图片




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

if(typeof module !== "undefined") {
    module.exports = CYZS.WebViewJs;
}
/**
 * 味道有点古怪的原生cyzs.webview.init的方法初始
 * 注册init方法
 */
//CYZS.WebViewJs.init();

