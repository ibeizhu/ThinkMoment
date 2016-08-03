/**
 * Created by Moment on 16/5/28.
 */
require("./users.less");
var moduleTpl = require("./usersTpl.html");
// 基础vue
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl,
    props: ['sessionIndex', 'userList'],
    methods:{
        onSetIndex:function (index) {
            this.sessionIndex = index;
            this.$dispatch("SessionIndexChanged",index);
        }
    }
});