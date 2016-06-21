/**
 * Created by Moment on 2016/1/17.
 */

/*--------------------------------最基础视图-----------------------------------*/
var Backbone = require("backbone");
module.exports = Backbone.View.extend({
    viewTpl : null,
    initialize:function(initObj) {
        // 补充基础视图公共方法
        Backbone.View.prototype.initialize.apply(this, arguments);
        if(initObj){
            this.dataObj = initObj.dataObj;
        }

    }
});