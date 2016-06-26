/**
 * Created by Moment on 16/6/14.
 */
'use strict';

import Base from './base.js';
import Pusher from 'pusher';
import _ from 'underscore';
import lodash from 'lodash';

export default class extends Base {
    /**
     * init
     * @param  {Object} http []
     * @return {}      []
     */
    async init(http){
        super.init(http);
        this.messagePusher = new Pusher(this.config("pusher"));
        this.adminUser = await this.getAdminUserInfo();
    }
    showAction(){
        return this.display();
    }
    showbakAction(){
        return this.display();
    }

    /**
     * 获取聊天的用户列表
     * @returns {*}
     */
    async usersAction(){
        let loginUser = await this.session("userInfo");
        let [fields,userList,totalUserList] = ["id,name,avatar,motto,position,isAdmin",{},{}];
        totalUserList = await this.model("user").field(fields).select();
        if(loginUser.isAdmin){
            userList = _.where(totalUserList,{isAdmin:0});
            loginUser = _.findWhere(totalUserList,{isAdmin:1});
        }else{
            userList = _.where(totalUserList,{isAdmin:1});
            loginUser = _.findWhere(totalUserList,{id:loginUser.userId});
        }
        return this.success({
            userList:userList,
            loginUser:loginUser
        });
    }

    /**
     * 根据某个用户id获取聊天列表,支持分页
     * @returns {*}
     */
    async listAction(){
        let loginUser = await this.session("userInfo");
        let userId = this.get("userId");
        if(!loginUser.isAdmin){
            // 非管理员登录用户只获取与管理员的对话列表
            userId = loginUser.userId;
        }
        let page = this.get("page");
        let pageSize = this.get("pageSize");
        if(think.isEmpty(page)){
            page = 1;
        }
        if(think.isEmpty(pageSize)){
            pageSize = 20;
        }
        // 这里userId当做聊天的relationId
        let chatList = await this.model("chat").where({relationId:userId}).page(page,pageSize).order("create_time DESC").countSelect();
        chatList.data = lodash.reverse(chatList.data);
        return this.success(chatList);
    }

    /**
     * 发送消息action
     */
    async sendAction(){
        let params = this.post();
        // 保存消息
        think.extend(params,{
            status:0,
            create_time:new Date().getTime(),
            update_time:new Date().getTime()
        });
        params.relationId = parseInt(params.relationId);
        params.speakerId = parseInt(params.speakerId);
        params.audienceId = parseInt(params.audienceId);
        
        let chatId = await this.model("chat").add(params);
        if(think.isEmpty(chatId)){
            this.fail("MESSAGE_SEND_FAIL");
            return;
        }
        this.pushMessage(params);
        this.success({
            result:true,
            chatId:chatId,
            message:"发送消息成功!"
        });
    }

    /**
     * 推送消息(每次发送一条消息,推送给管理员和当前关系人)
     * @param msg 消息
     */
    pushMessage(params){
        if(!params.relationId){
            return;
        }
        const pushEvent = 'moment-push';
        // 设计userId为relationId
        this.messagePusher.trigger(this.adminUser.id.toString(), pushEvent, params);
        this.messagePusher.trigger(params.relationId.toString(), pushEvent, params);
    }

    /**
     * 获取管理员信息
     * @returns {*}
     */
    async getAdminUserInfo(){
        let fields = "id,name,avatar,motto,position,isAdmin";
        let adminUser = await this.model("user").field(fields).where({id:100000}).find();
        return adminUser;
    }
    // async addmsgAction(){
    //     let msg = {
    //         // chatId:"",
    //         relationId:500002,
    //         speakerId:100000,
    //         audienceId:100003,
    //         message:"if you recieve this message , reply me",
    //         status:0,
    //         create_time:new Date().getTime(),
    //         update_time:new Date().getTime()
    //     };
    //     let chatId = await this.model("chat").add(msg);
    //     this.success({chatId:chatId});
    // }
    async getmsgAction(){
        let list = await this.model("chat").select();
        this.success(list);
    }
}