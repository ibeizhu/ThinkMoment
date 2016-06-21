if (typeof CYZS == "undefined") {
    var CYZS = {};
}

CYZS.UrlHelper = function(){
};


CYZS.UrlHelper.URL_SUIT_DETAIL = 'suit_detail'; //商品详情页
CYZS.UrlHelper.URL_SHOPKEEPER = 'shopkeeper';



CYZS.UrlHelper.URL_DICT = {}
CYZS.UrlHelper.URL_DICT[CYZS.UrlHelper.URL_SUIT_DETAIL] = 'pc/page/core/suit/index.html?viewUserId={viewUserId}&suitId={suitId}';
CYZS.UrlHelper.URL_DICT[CYZS.UrlHelper.URL_SHOPKEEPER] = 'pc/page/shop_owner/index.html?viewUserId={viewUserId}';

/**
 * 获取url路径配置
 * @param pageName
 * @param params
 * @returns {String}
 */
CYZS.UrlHelper.getUrl = function(pageName, params) {
    var pageUrl =  CYZS.UrlHelper.URL_DICT[pageName];
    for(var key in params) {
        pageUrl = pageUrl.replace('{' +key+'}', params[key]);
    }
    pageUrl = '/'+ pageUrl;
    return pageUrl;
}

if(typeof module !== "undefined") {
    module.exports = CYZS.UrlHelper;
}