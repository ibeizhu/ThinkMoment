/**
 * Created by Moment on 16/5/28.
 */
require("./head.less");
var moduleTpl = require("./headTpl.html");
// 基础vue
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl,
    data:function () {
        return {
            show:false
        }
    },
    methods:{
        onShowUserList:function () {
            this.show = !this.show;
            if(this.show){
                $('.m-usr-list').css('left','0');
            }else{
                $('.m-usr-list').css('left','-200px');
            }
        }
    }
});