/**
 * Created by Moment on 16/5/28.
 */
require("./main.less");
var moduleTpl = require("./mainTpl.html");
// 基础vue
var BaseVue = require("BaseVue");
// var Header = require("../header/header");
// 组件
// var Work = require("../work/work");
// var Contact = require("../contact/contact");
// var Statistics = require("../statistics/statistics");

module.exports = BaseVue.extend({
    template: moduleTpl,
    created:function() {

    },
    components:{
        // "work-cpn":Work,
        // "contact-cpn":Contact,
        // "statistics-cpn":Statistics
    },
    ready:function(){
        
    },
    data: function() {
        // 作用域数据结构
        return {

        }
    }
});