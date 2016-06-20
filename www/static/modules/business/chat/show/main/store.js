/**
 * Created by Moment on 16/6/17.
 */
var key = 'VUE-CHAT-v3';

// 虚拟数据
if (!localStorage.getItem(key)) {
    var now = new Date();

    var data = {
        // 登录用户
        user: {
            id: 1,
            name: 'Coffce',
            img: '/static/images/chat/images/1.jpg'
        },

        // 用户列表
        userList: [
            {
                id: 2,
                name: '示例介绍',
                img: '/static/images/chat/images/2.png'
            },
            {
                id: 3,
                name: 'webpack',
                img: '/static/images/chat/images/3.jpg'
            }
        ],

        // 会话列表
        sessionList: [
            {
                userId: 2,
                messages: [
                    {
                        text: 'Hello，这是一个基于Vue + Webpack构建的简单chat示例，聊天记录保存在localStorge。简单演示了Vue的基础特性和webpack配置。',
                        date: now
                    },
                    {
                        text: '项目地址: https://github.com/coffcer/vue-chat',
                        date: now
                    }
                ]
            },
            {
                userId: 3,
                messages: [
                    {
                        text: 'Hello，这是一个基于Vue + Webpack构建的简单chat示例，聊天记录保存在localStorge。简单演示了Vue的基础特性和webpack配置。',
                        date: now
                    },
                    {
                        text: 'Hello World',
                        date: now
                    }
                ]
            }
        ]
    };

    localStorage.setItem(key, JSON.stringify(data));
}

module.exports= {
    fetch:function() {
        return JSON.parse(localStorage.getItem(key));
    },
    save:function(store) {
        localStorage.setItem(key, JSON.stringify(store));
    }
};