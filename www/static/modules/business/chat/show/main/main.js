/**
 * Created by Moment on 16/5/28.
 */
require("./main.less");
var moduleTpl = require("./mainTpl.html");
// 基础vue
var BaseVue = require("BaseVue");
// 组件
var store = require("./store");
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
    },
    data: function() {
        var serverData = store.fetch();
        return {
            // 登录用户
            user: serverData.user,
            // 用户列表
            userList: serverData.userList,
            // 会话列表
            sessionList: serverData.sessionList,
            // 搜索key
            search: '',
            // 选中的会话Index
            sessionIndex: 0,
            rawData:{}
        };
    },
    computed: {
        session:function() {
            return this.sessionList[this.sessionIndex];
        }
    },
    watch: {
        // 每当sessionList改变时，保存到localStorage中
        sessionList: {
            deep: true,
            handler:function() {
                store.save({
                    user: this.user,
                    userList: this.userList,
                    sessionList: this.sessionList
                });
            }
        },
        rawData:function (oldValue,newValue) {
            console.log("rawData changed");
        }
    }
});