/**
 * Created by Moment on 2016/1/17.
 */
/*--------------------------------模块视图-----------------------------------*/

var BaseViewCoreFrame = require("./CYZS.BaseView");
module.exports = BaseViewCoreFrame.extend({
    initialize:function() {
        // 补充模块视图公共方法
        BaseViewCoreFrame.prototype.initialize.apply(this, arguments);
        this.tempHelper();
    },

    render: function () {
        if(this.viewTpl){
            var that = this;
            var _data =that.dataObj;
            var _html = template.compile(this.viewTpl)(_data);
            this.$el.html(_html);
        }
        return this.$el;
    },
    tempHelper:function(){

    }
});