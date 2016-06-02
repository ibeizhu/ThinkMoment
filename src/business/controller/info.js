/**
 * Created by Moment on 16/5/27.
 */
'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction(){
        return this.display();
    }

    async addAction(){
        let work = {
            "0":{
                startDate:1464314124,
                endDate:1464414124,
                position:"高级前端工程师",
                company:"上海优梦科技",
                description:"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师"
            },
            "1":{
                startDate:1464214124,
                endDate:1464314124,
                position:"全栈开发工程师",
                company:"因特尔",
                description:"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师"
            },
            "2":{
                startDate:1464214124,
                endDate:1464314124,
                position:"高级.NET工程师",
                company:"微软",
                description:"上海优梦科技高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师高级前端工程师"
            }
        };
        let skill = {
            "0":{
                key:"Javascript",
                value:7
                },
            "1":{
                key:"Nodejs/Express/Thinkjs",
                value:5
                },
            "2":{
                key:"Html5/css3",
                value:6
                },
            "3":{
                key:"Angular/Vue/Backbone/Seajs/Require",
                value:5
                },
            "4":{
                key:".NET/C#",
                value:5
                },
            "5":{
                key:"Webpack/Gulp",
                value:5
                },
            "6":{
                key:"Mysql/Sql/Redis/MongooDb",
                value:4
                }
        };
        let record = {
            avatar:"http://test.image.yourdream.cc/Files/76/8a/768ad6ab51b47b40a7739194a71eb00a647f317a_137258.jpg",
            name:"Moment Wang",
            position:"全栈开发工程师",
            address:"中国上海市浦东新区陆家嘴幸福大街",
            phone:"(+86)15001727307",
            email:"chuanww@sina.com",
            site:"www.chuan.com",
            work:JSON.stringify(work),
            introduction:"忠实诚信,讲原则，说到做到，决不推卸责任;有自制力，做事情始终坚持有始有终，从不半途而废;肯学习,有问题不逃避,愿意虚心向他人学习;自信但不自负,不以自我为中心;愿意以谦虚态度赞扬接纳优越者,权威者;会用100%的热情和精力投入到工作中;平易近人。为人诚恳,性格开朗,积极进取,适应力强、勤奋好学、脚踏实地，有较强的团队精神,工作积极进取,态度认真。",
            skill:JSON.stringify(skill),
            update_time:(new Date()).getTime()
        };
        let id = await this.model("info").add(record);
        this.success(id);
    }

    async getAction(){
        let info = await this.model("info").where({id:17}).find();
        info.work = JSON.parse(info.work);
        info.skill = JSON.parse(info.skill);
        info.total = 7;
        return this.success(info);
    }
}