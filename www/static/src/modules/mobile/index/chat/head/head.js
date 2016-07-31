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
            scrollFlag:true,
            scrollTopDistance:20
        }
    }
});