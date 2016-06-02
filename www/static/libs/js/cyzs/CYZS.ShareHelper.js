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
