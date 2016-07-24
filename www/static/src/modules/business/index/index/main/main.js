/**
 * Created by Moment on 16/5/28.
 */
require("./main.less");
var Util = require("tools/Util");
var moduleTpl = require("./mainTpl.html");
// 基础vue
var BaseVue = require("BaseVue");
// var Header = require("../header/header");
// 组件
var Work = require("../work/work");
var Contact = require("../contact/contact");
var Statistics = require("../statistics/statistics");

module.exports = BaseVue.extend({
    template: moduleTpl,
    created:function() {

    },
    components:{
        "work-cpn":Work,
        "contact-cpn":Contact,
        "statistics-cpn":Statistics
    },
    ready:function(){
        this.renderStarPlugin();
        this.bindScrollEvent();
    },
    data: function() {
        // 作用域数据结构
        return {

        }
    },
    methods: {
        /*
        * 星星闪烁特效
        * */
        renderStarPlugin:function () {
            // $(".js_pageWrap").sparkle({
            //     fill:"#f7c916"	,
            //     stroke:"#fde3a7",
            //     size: 30,
            //     duration:1000
            // }).sparkle({
            //     fill:"red"	,
            //     delay: 200,
            //     pause: 500,
            //     size: 20
            // }).sparkle({
            //     fill:"#do75ea",
            //     delay: 200,
            //     pause: 500,
            //     size: 20
            // });
        },
        renderRevolutionPlugin:function () {
            $(".js_mainTpl").revolution({
                delay:9000,
                startwidth:1170,
                startheight:500,
                hideThumbs:10
            });
        },
        bindScrollEvent:function () {
            var self = this;
            $(window).bind("scroll",function () {
                var scrollTop = $(window).scrollTop();
                if(scrollTop + parseInt($(window).height()) -20 > $(".js_workTpl").offset().top){
                    if(!$(".js_workTpl").hasClass("rollIn")){
                        Util.animateCss({
                            $selector: $(".js_lastest"),
                            animationName: "rollIn",
                            isNotRemoveClass:true
                        });
                    }
                    // $(".js_image").animate({top:"30px",left:"30px"},1500);
                }

                if(scrollTop + parseInt($(window).height()) -20 > $(".js_contact").offset().top){
                    if(!$(".js_contact").hasClass("bounceInLeft")){
                        Util.animateCss({
                            $selector: $(".js_contact"),
                            animationName: "bounceInLeft",
                            isNotRemoveClass:true
                        });
                    }
                }

                if(scrollTop + parseInt($(window).height()) -20 > $(".js_statistics").offset().top){
                    if(!$(".js_statistics").hasClass("bounceInRight")){
                        Util.animateCss({
                            $selector: $(".js_statistics"),
                            animationName: "bounceInRight",
                            isNotRemoveClass:true
                        });
                    }
                }
                // if(scrollTop + parseInt($(window).height()) -10 > $(".js_aboutMe").offset().top){
                //     self.animateCss($(".js_aboutMe"),"slideInUp");
                // }
            });
        }
    },
    filters:{

    }
});