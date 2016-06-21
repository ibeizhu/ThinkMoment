/**
 * Created by Moment on 16/5/28.
 */

(function () {
    var MainVue = require("./main/main");
    $.ajax({
        url:'/business/info/get',
        data:{},
        type:"GET",
        success:function (res) {
            new MainVue({
                el:".js_pageWrap",
                data:res.data
            });
        }
    });

})();