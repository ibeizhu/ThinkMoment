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
                    if(!res.data.result){
                        alert(res.data.message);
                        return;
                    }
                    alert("发送成功!");
                    self.name = "";
                    self.email = "";
                    self.message = "";
                }
            });
        }
    },
    filters:{

    }
});