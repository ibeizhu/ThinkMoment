/**
 * Created by Moment on 16/6/29.
 */
'use strict';

export default class extends think.controller.base {
    init(http) {
        super.init(http);
    }
    /*
     * 魔术方法,action之前调用
     * */
    __before(){
        this.setEntryJsPath();
    }
    /*
     * 设置主人口js文件(entry.pack.js or entry.min.js)
     * */
    setEntryJsPath(){
        let jsDebug = this.http.get("jsDebug");
        let [packJs,uglifyJs] = ['entry.pack.js','entry.min.js'];
        let isLocalHost = this.http.hostname.indexOf("127.0.0.1") > -1?true:false;
        this.mediaPath = '/static/build/';
        if(!think.isEmpty(jsDebug) || isLocalHost){
            this.entryJs = `/static/build/modules/business/${ this.http.controller }/${ this.http.action }/${ packJs }`;
        }else{
            this.entryJs = `/static/build/modules/business/${ this.http.controller }/${ this.http.action }/${ uglifyJs }`;
        }
    }
}