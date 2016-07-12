/**
 * Created by Moment on 16/7/4.
 */
(function () {
    var attachFastClick = require('fastclick');
    attachFastClick.attach(document.body);
    var MainVue = require("./main/main");
    var Life = require("./life/life");
    var Home = require("./home/home");
    var Blog = require("./blog/blog");
    
    var RouterApp = Vue.extend({});
    var router = new VueRouter();

    router.map({
        '/': {
            component: MainVue,
            subRoutes:{
                '/':{
                    component:Home
                }
            }
        },
        '/moment': {
            component: MainVue,
            subRoutes:{
                '/life':{
                    component:Life,
                    auth:false
                },
                '/work':{
                    component:Home,
                    auth:false
                },
                '/home':{
                    component:Home,
                    auth:true
                },
                '/blog':{
                    component:Blog,
                    auth:true
                }
            }
            // auth:true
        },
        // '/phone': {
        //     component: PhoneVerify
        // }
    });
    //router.mode = "html5";
    router.beforeEach(function (transition) {
        if (transition.to.auth) {
            // 对用户身份进行验证...
            transition.abort()
        } else {
            transition.next()
        }
    });
    router.start(RouterApp, '.js_pageWrap');
})();