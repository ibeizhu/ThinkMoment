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
        this.getChatList(function (data) {
            this.setSessionList(data);
        }.bind(this));
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
            // 请求参数
            params:{
                pageSize:10
            },
            // 接口请求的原始数据
            rawData:{}
        };
    },
    watch: {
        sessionIndex:function () {
            this.$broadcast("SessionIndexChanged",{});
            this.getChatList(function (data) {
                this.setSessionList(data);
            }.bind(this));
        }
    },
    events:{
        'ScrollEventLoadMessage':function (data) {
            // 添加message list
            this.setSessionList(data,true);
        }
    },
    methods:{
        setSessionList:function (result,isAppend) {
            if(isAppend){
                var pageList = _.toArray(result.data);
                pageList = _.union(pageList,this.session.messages);
                this.session.messages = pageList;
            }else{
                this.session = {
                    id:result.data[0].relationId,
                    messages:_.toArray(result.data)
                };
            }
        },
        evaluateScopeData:function (rawData) {
            this.user = rawData.loginUser;
            this.user.id = this.user.id.toString();
            this.userList = rawData.userList;
            _.each(this.userList,function (item) {
                item.id = item.id.toString();
            });
            
        },
        getChatList:function (callback) {
            $.ajax({
                url:'/business/chat/list',
                data:{
                    userId:this.userList[this.sessionIndex].id,
                    pageSize:this.params.pageSize
                },
                type:"GET",
                success:function (res) {
                    if(typeof callback == 'function'){
                        callback(res.data);
                    }
                }
            });
        },
        bindPusher:function () {
            var self = this;
            // Pusher.logToConsole = true;
            var pusher = new Pusher('ce9e65fa6227f9d65586', {
                encrypted: true
            });
            var channel = pusher.subscribe(this.user.id.toString());
            channel.bind('moment-push', function(data) {
                self.session.messages.push(data);
            });
        }
    }
});