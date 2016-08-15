/**
 * Created by Moment on 16/5/28.
 */

(function () {
    var Uploader = require('plugin/webuploader/uploader');
    var params ={
        config:{
            pick: {
                id: "#js_uploadBakImg"
            },
            formData:{
                
            },
            server:'/business/upload/image'
        },
        extensionField:{
            target:this
        },
        events:{
            onSuccess:function(response,file,uploader){
               alert("onSuccess");
            }
        }
    };
    var uploader = new Uploader(params);
})();