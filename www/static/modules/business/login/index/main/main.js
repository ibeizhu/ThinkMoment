/**
 * Created by Moment on 16/5/28.
 */
require("./main.less");
var moduleTpl = require("./mainTpl.html");
// 基础vue
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl,
    created:function() {

    },
    ready:function(){
        this.renderParticlesBackground();
        this.renderTheater();
        if(isMobile){
            $(".main-tpl").css({
                "top":"50%",
                "left":"50%",
                "right":"inherit",
                "-webkit-transform":"translate(-50%,-50%)",
                "-moz-transform":"translate(-50%,-50%)",
                "-o-transform":"translate(-50%,-50%)",
                "transform":"translate(-50%,-50%)"
            });
        }
    },
    data: function() {
        // 作用域数据结构
        return {
            username:"",
            password:""
        }
    },
    methods: {
        onLogin:function () {
            var self = this,params = {
                username:this.username,
                password:self.encrypt(this.password,8)
            };
            $.ajax({
                url:'/business/login/login',
                data:params,
                type:"GET",
                success:function (res) {
                    if(!res.data.result){
                        self.renderNotice("Please check your username or password correctly");
                        self.password = "";
                        return;
                    }
                    window.location.href = "/business/index/index";
                }
            });
        },
        encrypt:function(str,degist){
            if(!str){
                return false;
            }
            if(!degist){
                degist = 8;
            }
            str += 'think';
            var monyer = "";
            for(var i=0;i<str.length;i++)
                monyer+="\\"+str.charCodeAt(i).toString(degist);
            return monyer;
        },
        /**
         * 背景粒子特效
         */
        renderParticlesBackground:function () {
            particlesJS('particles-js',{
                    "particles": {
                        "number": {
                            "value": 80,
                            "density": {
                                "enable": true,
                                "value_area": 800
                            }
                        },
                        "color": {
                            "value": "#ffffff"
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                            "polygon": {
                                "nb_sides": 5
                            },
                            "image": {
                                "src": "img/github.svg",
                                "width": 100,
                                "height": 100
                            }
                        },
                        "opacity": {
                            "value": 0.5,
                            "random": false,
                            "anim": {
                                "enable": false,
                                "speed": 1,
                                "opacity_min": 0.1,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 5,
                            "random": true,
                            "anim": {
                                "enable": false,
                                "speed": 40,
                                "size_min": 0.1,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 150,
                            "color": "#ffffff",
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 6,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 400,
                                "line_linked": {
                                    "opacity": 1
                                }
                            },
                            "bubble": {
                                "distance": 400,
                                "size": 40,
                                "duration": 2,
                                "opacity": 8,
                                "speed": 3
                            },
                            "repulse": {
                                "distance": 200
                            },
                            "push": {
                                "particles_nb": 4
                            },
                            "remove": {
                                "particles_nb": 2
                            }
                        }
                    },
                    "retina_detect": true,
                    "config_demo": {
                        "hide_card": false,
                        "background_color": "#b61924",
                        "background_image": "",
                        "background_position": "50% 50%",
                        "background_repeat": "no-repeat",
                        "background_size": "cover"
                    }
                }
            );
        },
        /**
         * 提示框
         * @param message
         */
        renderNotice:function (message) {
            this.notification = new NotificationFx({
                message : '<span class="icon icon-megaphone"></span><p>'+message+'.</p>',
                layout : 'bar',
                effect : 'slidetop',
                type : 'notice', // notice, warning or error
                onClose : function() {
                }
            });
            this.notification.show();
        },
        renderTheater:function () {
            var self = this;
            var theater = theaterJS();
            theater
                .on('type:start, erase:start', function () {
                    var actor = theater.getCurrentActor();
                    actor.$element.classList.add('is-typing')
                })
                .on('type:end, erase:end', function () {
                    var actor = theater.getCurrentActor();
                    actor.$element.classList.remove('is-typing');

                });
            theater
                .addActor('kobe')
                .addActor('t-mac');

            theater
                .addScene('kobe:Welcome To Moment Home', 200)
                .addScene('t-mac:Please Login and Enjoy yourself!', 200)
                .addScene(function () {
                    setTimeout(function () {
                        $(".js_theater").animate({
                            'transform':'rotateX(30deg)',
                            'top':'-1000px',
                            'opacity':'0'
                        },1000);
                        $(".js_mainTpl").fadeIn(400);
                    },2000);
                })
        }
    },
    filters:{

    }
});