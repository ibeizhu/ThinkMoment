/**
 * Created by Moment on 16/5/28.
 */
require("./text.less");
var moduleTpl = require("./textTpl.html");
// 基础vue
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl,
    props: ['session'],
    data:function(){
        return {
            text: ''
        }
    },
    methods: {
        inputing:function(e) {
            if (e.ctrlKey && e.keyCode === 13 && this.text.length) {
                this.session.messages.push({
                    text: this.text,
                    date: new Date(),
                    self: true
                });
                this.text = '';
            }
        }
    }
});