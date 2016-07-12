/**
 * Created by Moment on 16/5/28.
 */
require("./life.less");
var moduleTpl = require("./lifeTpl.html");
// 基础vue
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl
});