/**
 * Created by Moment on 16/5/28.
 */
require("./statistics.less");
var moduleTpl = require("./statistics.html");
var BaseVue = require("BaseVue");

module.exports = BaseVue.extend({
    template: moduleTpl,
    created:function() {

    },
    props:{
        tpldata:Object
    },
    ready:function(){
        var self = this;
        self.renderCountUpPlugin("js_likedCount",self.tpldata.likedCount-100,self.tpldata.likedCount);
        self.renderCountUpPlugin("js_contactCount",self.tpldata.likedCount-200,self.tpldata.contactCount);
        self.renderCountUpPlugin("js_visitedCount",self.tpldata.likedCount-390,self.tpldata.visitedCount);
        self.renderCountUpPlugin("js_totalCount",self.tpldata.likedCount-400,self.tpldata.totalCount);
        self.bindScrollEvent();
    },
    data: function() {
        // 作用域数据结构
        return {
            countUpList:[]
        }
    },
    methods: {
       renderCountUpPlugin:function (target,start,end) {
           var options = {
               useEasing : true,
               useGrouping : true,
               separator : ',',
               decimal : '.',
               prefix : '',
               suffix : ''
           };
           this.countUpList[_.size(this.countUpList)] = new CountUp(target, start, end, 0, 3, options);
       },
        bindScrollEvent:function () {
            var self = this;
            $(window).bind("scroll",function () {
                if($(window).scrollTop() + parseInt($(window).height()) > $(".js_statisticsTpl").offset().top){
                    _.each(self.countUpList,function (item) {
                        item.start();
                    });
                    $(window).unbind("scroll");
                }
            });
        }
    }
});