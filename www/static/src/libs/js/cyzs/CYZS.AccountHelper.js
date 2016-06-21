/**
 * ============================================================================================================
 *
 *        高危脚本，必须被引入，用于过滤生成客户端webview的安全url链接
 *
 * ============================================================================================================
 */


if (typeof CYZS == "undefined") {
    var CYZS = {};
};

CYZS.AccountHelper = function( ){

};

/**
 * @public
 * 在app内的时候，才检测是否链接中是否带有userId和session，带有的话，需要做一些处理，并且最终跳转到不带信息的安全链接
 *
 */
CYZS.AccountHelper.checkAppLogin = function( ) {
    if(CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_APP_CYZS)) {
        var session = CYZS.Util.getValueFromHrefByKey('session');
        var userId = CYZS.Util.getValueFromHrefByKey('userId');
        if(!Cookies.get('_userId')){
            //如果是在app内，则发送一个userId和session的请求，success后，刷新页面
            if(session && userId) {
                //应用内未登录，通过服务端来实现一个跳转来set cookie
                window.location.replace(
                    '/?method=index.autoLogin'
                    + '&cyzsSession=' + session
                    + '&cyzsUserId=' + userId
                    + '&callbackURL=' + CYZS.Util.getHrefWithSplitKey(window.location.href)
                );
            }else{
            }
        }else{
            if(session && userId) {
                CYZS.AccountHelper.switchToAppSafeUrl();
            }
        }
    }
}

/**
 * 检测带session和userId的安全连接
 */
CYZS.AccountHelper.checkSafeLink =function( ) {
    var session = CYZS.Util.getValueFromHrefByKey('session');
    var userId = CYZS.Util.getValueFromHrefByKey('userId');
    if(session && userId) {
        if(Cookies.get('_userId') && Cookies.get('_userId')==userId){
            CYZS.AccountHelper.switchToAppSafeUrl();
        }else{
            //先登录
            window.location.replace(
                '/?method=index.autoLogin'
                + '&cyzsSession=' + session
                + '&cyzsUserId=' + userId
                + '&callbackURL=' + CYZS.Util.getHrefWithSplitKey(window.location.href)
            );
        }
    }
}

/**
 * @public
 * app外检测是否web有登录
 */
CYZS.AccountHelper.checkLogin = function( ) {
    if(!CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_APP_CYZS)){
        if (!Cookies.get('_userId')) {
            //跳转到登录页
            CYZS.AccountHelper.switchToUserLogin( );
        }
    }
};

/**
 * @public 跳转到统一的登录页面
 */
CYZS.AccountHelper.switchToUserLogin = function( ) {
    if(CYZS.BrowserHelper.check(CYZS.BrowserHelper.BROWSER_TYPE_APP_CYZS)){
        window.location.replace('cyzs://login?refresh=1');
    }
    else{        
        window.location.replace(CYZS.Config.MAIN_HOST +'/?method=user.mLogin&callbackURL=' + CYZS.Util.getHrefWithSplitKey(window.location.href));
    }
};


/**
 * @private 跳转到对于app而言的安全链接，不带userId和session
 */
CYZS.AccountHelper.switchToAppSafeUrl = function( ) {
    window.location.replace(CYZS.Util.getHrefWithSplitKey(window.location.href));
};



/**
 * ============================================================================================================
 *
 *        【注意】！！！此方法再类库被引入后，一定要执行一次，转化app端的webview链接为最终不带userId和session的安全链接
 *
 * ============================================================================================================
 */
CYZS.AccountHelper.checkSafeLink( );
/**
 *  ===============================  【注意】checkSafeLink引入后就立即调用了   ====================================
 */