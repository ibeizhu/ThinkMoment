/**
 * Created by Moment on 16/9/6.
 */
'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction(){
        this.visitCount = await this.getVisit();
        this.display();
    }
    async getVisit(){
        let visit = await this.session("visit");
        let pageType = `${this.http.module}-${this.http.controller}-${this.http.action}`;
        let now = (new Date()).getTime();
        let ip = this.http.ip();
        let row = await this.model("visit").where({pageType:pageType}).find();
        if(think.isEmpty(row)){
            let record = {
                count:1,
                pageType:pageType,
                ip:ip,
                create_time:now,
                update_time:now
            };
            let id = await this.model("visit").add(record);
            return 1;
        }
        if(think.isEmpty(visit)){
            row.count++;
            row.ip = ip;
            row.update_time = now;
            await this.model("visit").update(row);
            await this.session("visit", ip);
        }
        return row.count;
    }
}