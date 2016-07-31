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
            text: '',
            minHeight:22,
            maxHeight:60,
            target:null
        }
    },
    methods: {
        inputing:function(e) {
            this.target = e.target;
            var height,style=e.target.style,scrollHeight = e.target.scrollHeight - 6;
            style.height =  this.minHeight + 'px';
            if (scrollHeight > this.minHeight) {
                if (scrollHeight > this.maxHeight) {
                    height = this.maxHeight;
                    style.overflowY = 'scroll';
                } else {
                    height = scrollHeight;
                    style.overflowY = 'hidden';
                }
                style.height = height + 'px';
            }
            if (e.keyCode == 13 && this.text.length) {
                var now = new Date().getTime();
                var msg = {
                    sending:true,
                    virtualChatId:now.toString(),
                    relationId:this.session.id,
                    speakerId:this.user.id,
                    audienceId:this.session.id,
                    message:this.text
                };
                this.session.messages.push(msg);
                this.sendMessage(msg);
                this.text = '';
                style.height =  this.minHeight + 'px';
            }
        },
        sendMsg:function () {
            if (this.text.length) {
                var now = new Date().getTime();
                var msg = {
                    sending:true,
                    virtualChatId:now.toString(),
                    relationId:this.session.id,
                    speakerId:this.user.id,
                    audienceId:this.session.id,
                    message:this.text
                };
                this.session.messages.push(msg);
                this.sendMessage(msg);
                this.text = '';
                this.target.style.height = this.minHeight + 'px';
            }
        },
        showEmotions:function () {
            alert("功能开发中,敬请期待");
        },
        sendMessage:function (msg) {
            $.ajax({
                url:"/business/chat/send",
                type:"POST",
                data:msg
            });
        }
    }
});