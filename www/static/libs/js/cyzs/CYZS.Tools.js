/**
 * Created by one on 16-3-21.
 */
var cloneWhere = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
}
var cloneFindWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
}
_.Where=function(obj, attrs){
    var arr= [];
    var _attrs = {};
    for(var attrKey in attrs) {
        if(!isNaN(parseInt(attrs[attrKey]))){
            _attrs[attrKey] = attrs[attrKey]*1;
        }else{
            _attrs[attrKey] = attrs[attrKey];
        }
    }
    arr = cloneWhere(obj, _attrs);
    if(_.size(arr) > 0 ){
        return arr;
    }
    _attrs = {};
    for(var attrKey in attrs) {
        _attrs[attrKey] = attrs[attrKey] +"";
    }
    arr = cloneWhere(obj, _attrs);
    return arr;
};

_.findWhere = function(obj, attrs){
    var arr= [];
    var _attrs = {};
    for(var attrKey in attrs) {
        if(!isNaN(parseInt(attrs[attrKey]))){
            _attrs[attrKey] = attrs[attrKey]*1;
        }else{
            _attrs[attrKey] = attrs[attrKey];
        }
    }
    arr = cloneFindWhere(obj, _attrs);
    if(arr){
        return arr;
    }
    _attrs = {};
    for(var attrKey in attrs) {
        _attrs[attrKey] = attrs[attrKey] +"";
    }
    arr = cloneFindWhere(obj, _attrs);
    return arr;
};
