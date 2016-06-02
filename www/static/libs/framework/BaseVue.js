/**
 * Created by Moment on 16/5/28.
 */
var Vue = require("vue");
var moment = require("moment");

module.exports = Vue.extend({
    methods: {
        isNullOrEmpty:function(obj){
            if(obj==undefined || obj==null || obj==""){
                return true;
            }
            return false;
        }
    },
    filters:{
        formatDate:function (date,format) {
            return moment(date*1000).format(format);
        }
    }
});