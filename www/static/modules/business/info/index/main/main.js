/**
 * Created by Moment on 16/5/28.
 */
require("./main.less");
var moduleTpl = require("./mainTpl.html");
// 基础vue
var BaseVue = require("BaseVue");
// 组件
var Header = require("../header/header");
var Work = require("../work/work");
var Introduction = require("../introduction/introduction");

module.exports = BaseVue.extend({
    template: moduleTpl,
    created:function() {

    },
    components:{
        "header-temp":Header,
        "work-temp":Work,
        "intro-temp":Introduction
    },
    ready:function(){
        this.renderStarPlugin();
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
            $(".js_pageWrap").sparkle({
                fill:"#f7c916"	,
                stroke:"#fde3a7",
                size: 30,
                duration:1000
            }).sparkle({
                fill:"red"	,
                delay: 200,
                pause: 500,
                size: 20
            }).sparkle({
                fill:"#do75ea",
                delay: 200,
                pause: 500,
                size: 20
            });
        }
    },
    filters:{

    }
});