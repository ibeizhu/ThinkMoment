/**
 * Created by Moment on 16/5/28.
 */
require("./list.less");
var moduleTpl = require("./listTpl.html");
// 基础vue
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl,
    props: ['userList', 'sessionIndex', 'session', 'search'],
    methods: {
        select:function(value) {
            this.sessionIndex = this.userList.indexOf(value);
        }
    },
    filters: {
        search:function(list) {
            return list.filter(function(item){
                return item.name.indexOf(this.search) > -1;
            });
        }
    }
});