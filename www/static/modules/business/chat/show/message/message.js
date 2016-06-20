/**
 * Created by Moment on 16/5/28.
 */
require("./message.less");
var moduleTpl = require("./messageTpl.html");
// 基础vue
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl,
    props: ['session', 'user', 'userList'],
    computed: {
        sessionUser:function() {
            var self = this;
            var users = this.userList.filter(function (item) {
                return item.id === self.session.userId;
            });
            return users[0];
        }
    },
    filters: {
        // 筛选出用户头像
        avatar:function(item) {
            // 如果是自己发的消息显示登录用户的头像
            var user = item.self?this.user:this.sessionUser;
            return user && user.img;
        },
        // 将日期过滤为 hour:minutes
        time:function(date) {
            if (typeof date === 'string') {
                date = new Date(date);
            }
            return date.getHours() + ':' + date.getMinutes();
        }
    },
    directives: {
        // 发送消息后滚动到底部
        'scroll-bottom':function() {
            var self = this;
            Vue.nextTick(function () {
                self.el.scrollTop = self.el.scrollHeight - self.el.clientHeight;
            });
        }
    }
});