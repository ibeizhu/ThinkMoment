
module.exports  = {
    $alert:null,
    show:function(msg) {
        var _self = this;
        _self.remove( );

        var alertDom = '<div id="js_cyzsAlertWrap">'
            + msg
            + '</div>';
        $('body').append(alertDom);
        _self.$alert = $('#js_cyzsAlertWrap');

        _self.$alert.css({
            'color':'#fff',
            'background': '#93c037',
            'border-radius': '5px',
            'position' : 'fixed',
            'bottom' : '40px',
            'max-width': '300px',
            'padding': '15px 10px',
            'left' : '50%',
            'margin-left' : (-($alert.width() / 2)) + 'px',
            'z-index' : 10000,
            'display' : 'none'
        });

        _self.$alert.fadeIn(500);
        _self.$alert.interval = setInterval(function( ) {
            _self.fadeOut(500, function( ) {
                _self.remove( );
            });
        }, 2000);
    },
    remove:function( ) {
        var _self = this;
        if (_self.$alert) {
            clearInterval(_self.$alert.interval);
            _self.$alert.remove();
            _self.$alert = null;
        }
    }
};

