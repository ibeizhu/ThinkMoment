/**
 * Created by Moment on 16/5/28.
 */
require("./blog.less");
var moduleTpl = require("./blogTpl.html");
// 基础vue
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl
});