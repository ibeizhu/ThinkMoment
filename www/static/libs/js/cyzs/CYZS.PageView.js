/**
 * Created by Administrator on 2016/1/21.
 */
var ModuleViewCoreFrame = require("./CYZS.ModuleView");
module.exports = ModuleViewCoreFrame.extend({
    initialize:function() {
        // 补充模块视图公共方法
        ModuleViewCoreFrame.prototype.initialize.apply(this, arguments);
        if(this.viewTpl){
           this.$el.html(template.compile(this.viewTpl));
        }
    }
});