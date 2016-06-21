/**
 * Created by Moment on 16/5/28.
 */
// var Vue = require("vue");
var Util = require("../js/tools/Util");
module.exports = Vue.extend({
    methods: {
        isNullOrEmpty:function(obj){
            if(obj==undefined || obj==null || obj==""){
                return true;
            }
            return false;
        },
        getCloneObj:function (obj) {
            return JSON.parse(JSON.stringify(obj));
        }
    },
    filters:{
        formatDate:function (date,format) {
            return Util.formatDate(date,format);
        }
    }
});