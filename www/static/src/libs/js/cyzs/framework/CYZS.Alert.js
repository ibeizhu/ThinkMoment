
if (typeof CYZS == "undefined") {
    var CYZS = {};
}

CYZS.Alert = function( ){

};

CYZS.Alert.$alert = null;

/**
 * public
 * @param msg
 */
CYZS.Alert.show = function(msg) {
    CYZS.Alert.remove( );

    var alertDom = '<div id="js_cyzsAlertWrap">'
            + msg
            + '</div>';
    $('.js-page-wrap').append(alertDom);



    $alert = $('#js_cyzsAlertWrap');

    $alert.css({
        'color':'#fff',
        'background': 'rgba(0,0,0,0.7)',
        'border-radius': '5px',
        'position' : 'fixed',
        'bottom' : '40px',
        'max-width': '300px',
        'padding': '5px 10px',
        'left' : '50%',
        'z-index' : 10000,
        'display' : 'none'
    });

    $alert.css({
        'margin-left' : (-($alert.width() / 2)) + 'px'
    });

    $alert.fadeIn(1000);
    $alert.interval = setInterval(function( ) {
        $alert.fadeOut(1000, function( ) {
            CYZS.Alert.remove( );
        });
    }, 2000);
    CYZS.Alert.$alert = $alert;
};


/**
 * @private
 */
CYZS.Alert.remove = function( ) {
    var $alert = CYZS.Alert.$alert;
    if(CYZS.Alert.$alert) {
        clearInterval($alert.interval);
        $alert.remove( );
        CYZS.Alert.$alert = null;
    }
}