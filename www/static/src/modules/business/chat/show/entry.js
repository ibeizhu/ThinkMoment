/**
 * Created by Moment on 16/5/28.
 */

(function () {
    var MainVue = require("./main/main");
    // new MainVue({
    //     el:"#chat"
    // });
    
    $.ajax({
        url:'/business/chat/list',
        data:{},
        type:"GET",
        success:function (res) {
            new MainVue({
                el:"#chat",
                data:{rawData:res.data}
            });
        }
    });

})();