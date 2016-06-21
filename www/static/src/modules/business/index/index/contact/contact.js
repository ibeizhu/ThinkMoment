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
            var record = {
                name:this.name,
                email:this.email,
                message:this.message
            };
            $.ajax({
                url: '/business/index/add',
                data: record,
                type: "GET",
                success: function (res) {
                    if(!res.result){
                        self.renderNotice(res.message);
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
                message : '<span class="icon icon-megaphone"></span><p>'+message+' Go <a href="#">check it out</a> now.</p>',
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