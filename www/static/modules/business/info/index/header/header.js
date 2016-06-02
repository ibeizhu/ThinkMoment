/**
 * Created by Moment on 16/5/28.
 */
require("./header.less");
var moduleTpl = require("./headerTpl.html");
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
                avatar:"http://test.image.yourdream.cc/Files/76/8a/768ad6ab51b47b40a7739194a71eb00a647f317a_137258.jpg",
                name:"Moment Wang",
                position:"全栈开发工程师",
                address:"中国上海市浦东新区陆家嘴幸福大街",
                phone:"(+86)15001727307",
                email:"chuanww@sina.com",
                site:"www.chuan.com"
            }
        }
    },
    methods: {

    },
    filters:{

    }
});