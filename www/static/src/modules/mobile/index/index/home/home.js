/**
 * Created by Moment on 16/5/28.
 */
require("./home.less");
var moduleTpl = require("./homeTpl.html");
// 基础vue
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl
});