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
  async userAction(){
    let user =  await this.model("user").where({account:"Moment"}).find();
    let work = await this.model("work").where({user_id:user.id}).limit(3).select();
    let record = think.extend(user);
    delete record.password;
    let statistic = await this.model("statistic").where({id:400000}).find();
    record.works = work;
    record.likedCount = statistic.liked;
    record.contactCount = statistic.contact;
    record.visitedCount = statistic.day_visit;
    record.totalCount = statistic.total_visit;
    this.success(record);
  }

  async addAction(){
    let name = this.get("name");
    let email = this.get("email");
    let message = this.get("message");
    if(!name || !email || !message){
      this.fail({
        result:false,
        message:"必填字段不能为空!"
      });
    }
    let record = {
      name:name,
      email:email,
      message:message
    };
    await this.model("contact").add(record);
    this.success({
      result:true,
      message:"添加成功!"
    });
  }

}