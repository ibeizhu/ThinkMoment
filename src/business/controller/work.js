/**
 * Created by Moment on 16/5/27.
 */
'use strict';

import Base from './base.js';

export default class extends Base {

    async addAction(){
        let count = await this.model("work").count() + 1;
        let record = {
            user_id:100000,
            company:"MicroSoft",
            image:"/static/images/work"+count + ".jpg",
            detail:"科比是NBA最好的得分手之一，突破、投篮、罚球、三分球他都驾轻就熟，几乎没有进攻盲区，单场比赛81分的个人纪录就有力地证明了这一点。除了疯狂的得分外，科比的组织能力也很出众，经常担任球队进攻的第一发起人。另外科比还是联盟中最好的防守人之一，贴身防守非常具有压迫性。",
            startTime:(new Date()).getTime(),
            endTime:(new Date()).getTime(),
            create_time:(new Date()).getTime(),
            update_time:(new Date()).getTime()
        };
        let id = await this.model("work").add(record);
        this.success(id);
    }

    async getAction(){
        let userId = this.get("userid");
        let record = await this.model("work").where({user_id:userId}).find();
        return this.success(record);
    }

    async listAction(){
        let page = this.get("page");
        let userid = this.get("userid");
        if(think.isEmpty(userid)){
            userid = 100000;
        }
        if(think.isEmpty(page)){
            page = 1;
        }
        let list = await this.model("work").page(page,10).countSelect();
        return this.success(list);
    }
    async deleteAction(){
        let id = this.get("id");
        if(think.isEmpty(id)){
            this.fail({
                message:"请提供id!"
            });
            return;
        }
        let affectedRows = await this.model("work").where({id:id}).delete();
        let data = {};
        if(affectedRows > 0){
            data = {
                message:"删除成功!",
                affectedRows:affectedRows
            };
        }else{
            data = {
                message:"没有此ID!",
                affectedRows:affectedRows
            };
        }
        return this.success(data);
    }
}