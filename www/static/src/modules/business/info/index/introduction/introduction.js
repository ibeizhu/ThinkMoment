/**
 * Created by Moment on 16/5/28.
 */
require("./introduction.less");
var moduleTpl = require("./introductionTpl.html");
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl,
    created:function() {

    },
    props:{
        tpldata:Object
    },
    ready:function(){

    },
    data: function() {
        // 作用域数据结构
        return {
            tpldata:{
                
            }
        }
    },
    methods: {

    },
    filters:{

    }
});