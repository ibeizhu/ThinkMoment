/**
 * Created by Moment on 16/5/28.
 */
require("./main.less");
var moduleTpl = require("./mainTpl.html");
// 基础vue
var BaseVue = require("BaseVue");
// 组件
var Card = require("../card/card");
var List = require("../list/list");
var Text = require("../text/text");
var Message = require("../message/message");

module.exports = BaseVue.extend({
    template: moduleTpl,
    components:{
        "card":Card,
        "list":List,
        "text":Text,
        "message":Message
    },
    ready:function(){
        this.evaluateScopeData(this.rawData);
        this.getChatList();
        this.bindPusher();
    },
    data: function() {
        return {
            // 登录用户
            user: {},
            // 用户列表
            userList: {},
            // 会话列表
            session:{},
            // 搜索key
            search: '',
            // 选中的会话Index
            sessionIndex: 0,
            // 接口请求的原始数据
            rawData:{}
        };
    },
    watch: {
        sessionIndex:function () {
            this.getChatList();
        }
    },
    methods:{
        evaluateScopeData:function (rawData) {
            this.user = rawData.loginUser;
            this.user.id = this.user.id.toString();
            this.userList = rawData.userList;
            _.each(this.userList,function (item) {
                item.id = item.id.toString();
            });
            
        },
        getChatList:function () {
            $.ajax({
                url:'/business/chat/list',
                data:{
                    userId:this.userList[this.sessionIndex].id
                },
                type:"GET",
                success:function (res) {
                    this.session = {
                        id:res.data.data[0].relationId,
                        messages:_.toArray(res.data.data)
                    };
                }.bind(this)
            });
        },
        bindPusher:function () {
            var self = this;
            // Pusher.logToConsole = true;
            var pusher = new Pusher('f04759682e5fa7e8ae8c', {
                encrypted: true
            });
            var channel = pusher.subscribe(this.user.id.toString());
            channel.bind('moment-push', function(data) {
                self.session.messages.push(data);
            });
        }
    }
});