/**
 * Created by Moment Wang on 2016/5/6.
 */
import _ from "underscore";
import http from "http";
/*
* 统一的Request方法
* */
global.cyzsRequest = {
    defaultOption:{
        hostname: 'apitest.yourdream.cc',
        headers:{
            "Accept-Language":"zh-CN,zh;q=0.8",
            "Cache-Control":"max-age=0",
            "Connection":"keep-alive",
            "Content-Type":"text/html; charset=utf-8",
            "Cookie":"PHPSESSID=0r7lnpmq10pnk505dem9cr5k02; adminSearchMenu=; _ga=GA1.3.1726755873.1462343494; PHPSESSID=f0ose95r16vrsm1c5297ckljt1; qqmail_alias=chuan.wang@yourdream.cc; anonymousUserId=4503601020921871; _userId=1345228279; _password=caf8a9cb92d340a5ed9ec4ebb41b4e43; _sfv=ce100a1042359e0b8d1d3324b7bffdad; _psfv=ce100a1042359e0b8d1d3324b7bffdad; Hm_lvt_81f958da40dae4d146ef160171e49c7e=1462357587,1462357777,1462527406,1462763119; Hm_lpvt_81f958da40dae4d146ef160171e49c7e=1462874424; _ga=GA1.2.1726755873.1462343494; _gat=1",
            "Host":"apitest.yourdream.cc"
        }
    },
    get:function(url,opt){
        let deferred = think.defer();
        var _opt = this.defaultOption;
        _opt.method = "get";
        _opt.path = "/"+(url||"business.php")+"?";
        _.each(opt,function(param,key){
            _opt.path += key+"="+param+"&";
        });
        console.log("path1");
        console.log(_opt.path);
        this.request(_opt,function(data){
            deferred.resolve(data);
        });
        return deferred.promise;
    },
    post:function(url,opt){
        let deferred = think.defer();
        var _opt = this.defaultOption;
        _opt.method = "post";
        _opt.path = "/"+(url||"business.php")+"?";
        _.each(opt,function(param,key){
            _opt.path += key+"="+param+"&";
        });
        this.request(_opt,function(data){
            deferred.resolve(data);
        });
        return deferred.promise;
    },
    request:function(opts,callback){
        var responseData = "";
        var request = http.request(opts,function(response){
            response.setEncoding('utf8');
            response.on('data',function(chunk){
                responseData += chunk;
                //responseData = _.extend(responseData,JSON.parse(chunk));
            });

            response.on('end',function(data){
                responseData = JSON.parse(responseData);
                if(responseData.result == 0){
                    callback(responseData);
                }
                else{
                    console.log("Error:"+responseData.result+"; Message:"+responseData.msg.message);
                }
            });

            response.on('error',function(){
                console.log('请求错误!')
            })
        });
        request.end();
    }
};

