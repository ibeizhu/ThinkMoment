/**
 * Created by Moment on 16/5/28.
 */
require("./main.less");
var moduleTpl = require("./mainTpl.html");
// 基础vue
var BaseVue = require("BaseVue");
// 组件
var Bar = require("../component/bar");
module.exports = BaseVue.extend({
    template: moduleTpl,
    components:{
        "bar":Bar
    },
    ready:function(){
        this.bindAlloyFinger();
    },
    data: function() {
        return {
            mainStyle:{
                left:'0'
            }
        }
    },
    methods:{
        bindAlloyFinger:function () {
            var self = this;
            new AlloyFinger($('body')[0], {
                swipe: function (evt) {
                    console.log("swipe" + evt.direction);
                    // alert("swipe" + evt.direction);
                    if(evt.direction == 'Right'){
                        self.mainStyle.left = '150px';
                    }else if(evt.direction == 'Left'){
                        self.mainStyle.left = '0';
                    }
                }
            });
        },
        onShowBar:function () {
            if(this.mainStyle.left == 0){
                this.mainStyle.left = '150px';
                // this.mainStyle.transform = 'rotate3d(1，1,0,45deg)';
            }else{
                this.mainStyle.left = '0';
                // this.mainStyle.transform = 'skewY(0)';
            }

        }
    }
});