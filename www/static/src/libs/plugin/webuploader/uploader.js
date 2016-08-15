/**
 * Created by Moment Wang on 2015/12/28.
 */
/*
* 详细介绍请参照ReadMe.txt文件
* */

require("./webuploader.css");

function UploaderModule(obj){
    if(!WebUploader){
        console.log("UploaderModule:Fatal Error!please load WebUploader.js");
        return;
    }
    if(!obj || !obj.config){
        console.log("UploaderModule:Fatal Error!please provide initialize params");
        return;
    }
    //上传配置参数
    this.defaultConfig = $.extend(this.defaultConfig,obj.config);
    this.setConfig(obj.config);

    //扩展字段参数：target当前作用域，isManualUpload是否手动开启上传
    if(obj.extensionField){
        this.extensionField = obj.extensionField;
        this.target = obj.extensionField.target;
        this.isManualUpload = obj.extensionField.isManualUpload;
    }
    this.isFirstTip = true;
    this.uploader = WebUploader.create(this.defaultConfig);
    this.initEvents(obj.events);
}

UploaderModule.prototype={
    defaultConfig:{
        pick: {
            id: "",
            multiple:false
        },
        accept:{
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        method:'POST',
        formData:{
            "PHPSESSID": ""
        },
        compress:false,
        swf:'./Uploader.swf',
        fileVal: 'images',
        server: "", //上传地址
        fileNumLimit: 1,
        fileSizeLimit: 5 * 1024 * 1024,    //5M
        fileSingleSizeLimit: 5 * 1024 * 1024    //5M
    },
    setConfig:function(config){
        if(config.pick.multiple && !config.fileNumLimit){
            this.defaultConfig = $.extend(this.defaultConfig,{
                fileNumLimit: 15,
                fileSizeLimit: 15 * 1024 * 1024
            });
        }else if(config.pick.multiple && config.fileNumLimit){
            this.defaultConfig = $.extend(this.defaultConfig,{
                fileSizeLimit: Number(this.defaultConfig.fileNumLimit) *5* 1024 * 1024
            });
        }
        else{
            this.defaultConfig.pick.multiple = false;
        }
    },
    /**
     * 队列之前
     * @param events
     */
    onBeforeFileQueued:function (events) {
        var that = this;
        this.uploader.on("beforeFileQueued",function(file){
            if(typeof events.onBeforeFileQueued == 'function'){
                if(events.onBeforeFileQueued.apply(that.target,[file,that.uploader]) == false){
                    //重置上传，重复点击上传
                    that.uploader.reset();
                }
            }else{
                if(file.size > that.defaultConfig.fileSingleSizeLimit && that.isFirstTip){
                    that.isFirstTip = false;
                    alert("请保证图片大小在5M以下");
                    that.uploader.reset();
                    setTimeout(function () {
                        that.isFirstTip = true;
                    },500);
                }
            }
        });
    },
    /*
     * 文件添加事件
     * */
    onFileQueued:function(events){
        var that = this;
        var config = that.defaultConfig;
        //multiple:true,多图上传
        if(config.pick.multiple){
            //图片添加事件
            that.uploader.on("filesQueued",function(files){
                if($.isFunction(events.onFilesQueued)){
                    //文件添加的回调
                    if(events.onFilesQueued.apply(that.target,[files,that.uploader]) == false){
                        //重置上传，重复点击上传
                        that.uploader.reset();
                        return;
                    }
                }
                //文件添加成功，预览回调事件做文件大小判断
                if($.isFunction(events.onFilePreview)){
                    //对每个图片做预览回调
                    $.each(files,function(index,file){
                        //文件添加成功预览的回调
                        that.previewFile(file,events);
                    });
                }else{
                    //是否手动开始上传
                    if(!that.isManualUpload){
                        that.uploader.upload();
                    }
                }
            });
        }else{
            //图片添加事件
            that.uploader.on("fileQueued",function(file){
                if($.isFunction(events.onFileQueued)){
                    //文件添加的回调
                    if(events.onFileQueued.apply(that.target,[file,that.uploader]) == false){
                        //重置上传，重复点击上传
                        that.uploader.reset();
                        return;
                    }
                }
                //文件添加成功，预览回调事件做文件大小判断
                if($.isFunction(events.onFilePreview)){
                    //文件添加成功预览的回调
                    that.previewFile(file,events);
                }else{
                    //是否手动开始上传
                    if(!that.isManualUpload){
                        that.uploader.upload();
                    }
                }
            });
        }
    },
    /*
     * 预览图片事件
     * */
    previewFile:function(file,events){
        var that =this;
        //文件添加成功预览的回调
        that.uploader.makeThumb(file,function(error,src) {
            if (error) {
                return;
            }
            var currentImg = new Image();
            currentImg.src= src;
            currentImg.onload=function(){
                //文件预览回调
                if($.isFunction(events.onFilePreview)){
                    if(events.onFilePreview.apply(that.target,[currentImg,file,that.uploader]) == false){
                        file.setStatus("invalid");
                    }
                }
                //是否手动开始上传
                if(!that.isManualUpload){
                    that.uploader.upload();
                }
            };
        },1,1);
    },
    /*上传进度事件*/
    onPercentage:function(events){
        var that = this;
        this.uploader.on("uploadProgress",function(file,percentage){
            if($.isFunction(events.onPercentage)){
                //上传进度事件的回调
                percentage=percentage*100;
                events.onPercentage.apply(that.target,[percentage,file,that.uploader]);
            }
        });
    },
    /*图片上传成功函数*/
    onSuccess:function(events){
        var that = this;
        this.uploader.on("uploadSuccess",function(file,response){
            if($.isFunction(events.onSuccess)){
                //上传成功的回调
                events.onSuccess.apply(that.target,[response,file,that.uploader]);
            }
        });
    },
    /*图片上传失败函数*/
    onError:function(events){
        var that = this;
        this.uploader.on("uploadError",function(file,response) {
            if($.isFunction(events.onError)){
                //上传失败的回调
                events.onError.apply(that.target,[response,file,that.uploader]);
            }
        });
    },
    /*所有图片上传完成函数*/
    onFinished:function(events){
        var that = this;
        this.uploader.on("uploadFinished",function(){
            if($.isFunction(events.onFinished)){
                //上传完成的回调
                events.onFinished.apply(that.target,[that.uploader]);
            }
            //重置上传，重复点击上传
            that.uploader.reset();
        });
    },
    /*
     * 初始化所有事件
     * */
    initEvents:function(events){
        if(this.uploader){
            if(!events){
                events={};
            }
            this.onBeforeFileQueued(events);
            this.onFileQueued(events);
            this.onPercentage(events);
            this.onSuccess(events);
            this.onError(events);
            this.onFinished(events);
        }else{
            alert("初始化时请提供上传配置参数");
        }
    },
    /*开始上传事件--isManualUpload:true时调用*/
    onStartUpload:function(){
        this.uploader.upload();
    }
};

module.exports = UploaderModule;