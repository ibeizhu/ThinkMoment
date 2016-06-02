/**
 * 公共的基础数据处理方法，主要针对suit、goods这样的字段
 */
if (typeof CYZS == "undefined") {
    var CYZS = {};
}

CYZS.BusinessDataHelper = function( ) {

};

/**
 * 搭配数据结构的通用处理
 * @param inputObj
 * @param option
 * @returns {*}
 */
CYZS.BusinessDataHelper.formatSuitData = function(inputObj, option) {
    var value = inputObj;
    //调用公共属性处理
    value = CYZS.BusinessDataHelper.formatCommonProp(value);

    value.avatar = CYZS.Util.formatDFSUrl(value.avatar);
    value.publishTime = CYZS.Util.getDeltaTimeDisplay(value.time);
    //处理标签
    var markList = value.markList;
    for (var key in markList) {
        var markInfoObj = markList[key];
        markList[key].left = markInfoObj.x / 100 * value.imageActualWidth;
        markList[key].top = (markInfoObj.y / 100) * (value.imageActualWidth / value.width * value.height) - 20;
        //标签的朝向
        //tagWidth字段为了解决安卓设备下，因为标签的缘故，撑大了容器，导致底部的toolbar坐标错乱，ios正常
        if(markInfoObj.direction == "right"){
            markList[key].isDirLeft = false;
            markList[key].tagWidth = (markList[key].left) + "px";
        }else{
            markList[key].isDirLeft = true;
            markList[key].tagWidth = (value.imageActualWidth - markList[key].left) + "px";
        }
    }
    return value;
};

/**
 * 单品数据结构的通用处理
 * @param inputObj
 * @param option
 */
CYZS.BusinessDataHelper.formatGoodsData = function(inputObj, option) {
    var value = inputObj;
    //调用公共属性处理
    value = CYZS.BusinessDataHelper.formatCommonProp(value);
    return value;
};

CYZS.BusinessDataHelper.formatCommonProp = function(inputObj, option) {
    var value = inputObj;
    //计算图片的实际高度
    if(value.imageActualWidth) {
        value.imageActualHeight = value.imageActualWidth / value.width * value.height;
    }
    if(value.price !=undefined&& value.price != value.originalPrice){
        value.discount = (value.price * 10 / value.originalPrice).toFixed(1);
        var toSplitNum = value.discount;
        var splitedNum = toSplitNum.split('.');
        if(splitedNum[1]==0){
            //去整数折扣的 '.0' 最后浮点
            value.discount = splitedNum[0];
        }
    }
    value.image = CYZS.Util.formatDFSUrl(value.image);
    return value;
};

