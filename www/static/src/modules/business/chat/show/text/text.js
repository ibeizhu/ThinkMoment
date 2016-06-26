/**
 * Created by Moment on 16/5/28.
 */
require("./text.less");
var moduleTpl = require("./textTpl.html");
// 基础vue
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl,
    props: ['session','user'],
    data:function(){
        return {
            text: ''
        }
    },
    methods: {
        inputing:function(e) {
            if (e.ctrlKey && e.keyCode === 13 && this.text.length) {
                var msg = {
                    relationId:this.session.id,
                    speakerId:this.user.id,
                    audienceId:this.session.id,
                    message:this.text
                };
                this.sendMessage(msg);
                this.text = '';
            }
        },
        sendMessage:function (msg) {
            $.ajax({
                url:"/business/chat/send",
                type:"POST",
                data:msg,
                success:function (response) {
                    
                }
            });
        }
        
    }
});