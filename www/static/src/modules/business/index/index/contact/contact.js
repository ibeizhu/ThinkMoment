/**
 * Created by Moment on 16/5/28.
 */
require("./contact.less");
var moduleTpl = require("./contactTpl.html");
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl,
    created:function() {

    },
    props:{
        tpldata:Object
    },
    ready:function(){
    },
    data: function() {
        // 作用域数据结构
        return {
            name:"",
            email:"",
            message:""
        }
    },
    methods: {
        addMessage: function () {
            var self = this;
            if(!this.name){
                self.renderNotice("Name can not be empty");
                return;
            }
            if(!this.email){
                self.renderNotice("Email can not be empty");
                return;
            }
            if(!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.email)){
                self.renderNotice("Email format incorrect");
                return;
            }
            if(!this.message){
                self.renderNotice("Message can not be empty");
                return;
            }
            var record = {
                name:this.name,
                email:this.email,
                message:this.message
            };
            $.ajax({
                url: '/business/contact/add',
                data: record,
                type: "POST",
                success: function (res) {
                    if(res.errno > 0){
                        self.renderNotice("request params error");
                        return;
                    }
                    self.renderNotice("Your message has been sent successfully.");
                    self.name = "";
                    self.email = "";
                    self.message = "";
                }
            });
        },
        renderNotice:function (message) {
            this.notification = new NotificationFx({
                message : '<span class="icon icon-megaphone"></span><p>'+message+'</p>',
                layout : 'bar',
                effect : 'slidetop',
                type : 'notice', // notice, warning or error
                onClose : function() {
                }
            });
            this.notification.show();
        }
    },
    filters:{

    }
});