/**
 * Created by Moment on 16/5/27.
 */
'use strict';

import Base from './base.js';

export default class extends Base {
    
    async addAction(){
        // let count = await this.model("user").count();
        let record = {
            id:100001,
            account:"Iverson",
            password:"iverson@123",
            name:"Allen Iverson",
            avatar:"/static/build/images/avatar.jpg",
            position:"NBA Start",
            phone:"13123456711",
            email:"iverson@nba.com",
            site:"www.iverson.com",
            address:"美国76队",
            motto:"where amazing happens",
            introduction:"忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。",
            create_time:(new Date()).getTime(),
            update_time:(new Date()).getTime()
        };
        let id = await this.model("user").add(record);
        this.success(id);
    }

    async getAction(){
        let userId = this.get("id");
        let user = await this.model("user").where({id:userId}).find();
        return this.success(user);
    }

    async listAction(){
        let page = this.get("page");
        if(think.isEmpty(page)){
            page = 1;
        }
        let list = await this.model("user").page(page,10).countSelect();
        return this.success(list);
    }
    async deleteAction(){
        let id = this.get("id");
        if(think.isEmpty(id)){
            this.fail({
                message:"请提供用户id!"
            });
            return;
        }
        let affectedRows = await this.model("user").where({id:id}).delete();
        let data = {};
        if(affectedRows > 0){
            data = {
                message:"删除成功!",
                affectedRows:affectedRows
            };
        }else{
            data = {
                message:"没有此用户ID!",
                affectedRows:affectedRows
            };
        }
        return this.success(data);
    }
}