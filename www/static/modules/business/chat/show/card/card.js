/**
 * Created by Moment on 16/5/28.
 */
require("./card.less");
var moduleTpl = require("./cardTpl.html");
// 基础vue
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl,
    props: ['user', 'search']
});