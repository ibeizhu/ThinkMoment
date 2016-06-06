/**
 * Created by Moment on 16/6/6.
 */
'use strict';

import Base from './base.js';

export default class extends Base {

    async addAction(){
        let record = {
            liked:5897,
            contact:2637,
            day_visit:978,
            total_visit:45325,
            create_time:(new Date()).getTime(),
            update_time:(new Date()).getTime()
        };
        let id = await this.model("statistic").add(record);
        this.success(id);
    }

    async getAction(){
        let record = await this.model("statistic").select();
        return this.success(record);
    }

    async deleteAction(){
        let id = this.get("id");
        if(think.isEmpty(id)){
            this.fail({
                message:"请提供id!"
            });
            return;
        }
        let affectedRows = await this.model("statistic").where({id:id}).delete();
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