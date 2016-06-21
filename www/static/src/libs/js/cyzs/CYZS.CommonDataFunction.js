/**
 * Created by Administrator on 2015/12/22.
 */

var AjaxHelper = require("./CYZS.AjaxHelper");
var CommonDataFunction = {
    NOT_BASE64_IMAGE_FLAG :'baseImageIsNull'//base64 图片的数组遍历为空时的标示
};
/***
 * imageBaseList ：图片base64码数组
 * @param imageBaseList
 * @param upLoadComplete
 */
CommonDataFunction.upLoadImageAjax = function(imageBaseList,upLoadComplete){
    var n = imageBaseList.length,that =this;
    var target = CommonDataFunction.upLoadImageAjax.caller.caller;//获取upLoadComplete回调函数的作用域
    if(n>0){
        AjaxHelper({
            url:"?method=image.doUploadBase64Image",
            data: {
                image:imageBaseList[n-1]
            },
            type : 'post',
            onSuccess: function (res) {
                var num = n-1;
                imageBaseList.pop();
                upLoadComplete.apply(target, [res.data,num]);
                that.upLoadImageAjax(imageBaseList,upLoadComplete);

            }
        });
    }else{
        upLoadComplete(that.NOT_BASE64_IMAGE_FLAG)
    }
};

module.exports = CommonDataFunction;
