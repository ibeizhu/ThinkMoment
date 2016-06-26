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
            if(item.speakerId == this.user.id){
                return this.user.avatar;
            }else{
                var user = _.findWhere(this.userList,{id:item.speakerId.toString()});
                if(!user){
                    return "/static/build/images/defaultUser.jpeg";
                }
                return user.avatar;
            }
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