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




