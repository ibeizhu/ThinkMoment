/**
 * Created by Moment on 16/5/28.
 */
require("./work.less");
var moduleTpl = require("./workTpl.html");
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
        }
    },
    methods: {

    },
    filters:{

    }
});