/**
 * Created by Moment on 16/6/14.
 */
'use strict';

import Base from './base.js';
import Pusher from 'pusher';

export default class extends Base {
    /**
     * init
     * @param  {Object} http []
     * @return {}      []
     */
    init(http){
        super.init(http);
        this.messagePusher = new Pusher(this.config("pusher"));
    }
    showAction(){
        return this.display();
    }
    pushAction(){
        let msg = this.get("msg");
        if(think.isEmpty(msg)){
            msg = "Hello!";
        }
        this.messagePusher.trigger('moment_channel', 'my_event', {
            "message": msg
        });

        this.success({
            result:true,
            message:"推送成功!"
        });
    }

    /**
     * 发送消息action
     */
    async sendAction(){
        if(!this.isPost()){
            this.fail("INCORRECT_AJAX_TYPE_POST");
            return;
        }
        let params = this.post();
        // 检查对话的关系链
        let relationItem = await this.model("chatrelation").where({relationId:params.relationId}).find();
        if(think.isEmpty(relationItem)){
            this.fail("RELATION_NOT_EXIST");
            return;
        }
        if(relationItem.collectionId.indexOf(params.speakerId) == -1 || relationItem.collectionId.indexOf(params.audienceId) == -1){
            this.fail("RELATION_NOT_MATCH");
            return;
        }
        // 保存消息
        think.extend(params,{
            status:0,
            create_time:new Date().getTime(),
            update_time:new Date().getTime()
        });
        let chatId = await this.model("chat").add(params);
        if(think.isEmpty(chatId)){
            this.fail("MESSAGE_SEND_FAIL");
            return;
        }
        this.messagePusher.trigger(params.relationId, 'moment-push', params);
        this.success({
            result:true,
            chatId:chatId,
            message:"发送消息成功!"
        });
    }

    /**
     * 推送消息
     * @param msg 消息
     */
    pushMessage(msg){
        let pushMessage = {
            speakerId:"123",
            audienceId:"234",
            message:msg
        };
        this.messagePusher.trigger('moment_channel', 'my_event', pushMessage);
    }
    async addmsgAction(){
        let msg = {
            // chatId:"",
            relationId:500000,
            speakerId:100000,
            audienceId:100001,
            message:"我正在家里写代码呢",
            status:0,
            create_time:new Date().getTime(),
            update_time:new Date().getTime()
        };
        let chatId = await this.model("chat").add(msg);
        this.success({chatId:chatId});
    }
    async getmsgAction(){
        let list = await this.model("chat").select();
        this.success(list);
    }
    // async addrelationAction(){
    //     let obj = {
    //         // relationId:"",
    //         collectionId:"100000-100003",
    //         create_time:new Date().getTime(),
    //         update_time:new Date().getTime()
    //     };
    //     let relationId = await this.model("chatrelation").add(obj);
    //     this.success({relationId:relationId});
    // }
    async getrelationAction(){
        let list = await this.model("chatrelation").select();
        this.success(list);
    }
}