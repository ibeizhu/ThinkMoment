'use strict';

export default class extends think.controller.base {

  init(http) {
    super.init(http);
    this.topMenuData = {};
    this.leftNavData = {};
  }
  /*
   * 检查session
   * */
  async __before(){
    // // 头部菜单数据
    // this.topMenuData = await this.getTopMenuData();
    // // 左侧的导航栏数据
    // this.leftNavData = this.getLeftNavData();
      await this.filterBlankControllerActions();
      this.setEntryJsPath();
  }
  setEntryJsPath(){
      // jsDebug js调试开关
      // TODO Moment js文件路径待改为build路径
      let jsDebug = this.http.get("jsDebug");
      let [packJs,uglifyJs] = ['entry.pack.js','entry.min.js'];
      let isLocalHost = this.http.hostname.indexOf("127.0.0.1") > -1?true:false;
      if(!think.isEmpty(jsDebug) || isLocalHost){
          this.entryJs = `/static/modules/business/${ this.http.controller }/${ this.http.action }/${ packJs }`;
      }else{
          this.entryJs = `/static/modules/business/${ this.http.controller }/${ this.http.action }/${ uglifyJs }`;
      }
  }
  // /*
  //  * 请求头部接口，获取头部导航栏数据
  //  * */
  // async getTopMenuData (){
  //   // TODO Moment 获取接口
  //   let _param =  {
  //     "method": 'nav.get',
  //     "model[0]": 'initData',
  //     "model[1]": 'menu',
  //     "model[2]": 'topAdvertisement',
  //     "model[3]": 'alert'
  //   };
  //   let result = await cyzsRequest.get(null,_param);
  //   return result.data.menu;
  // }
  // /*
  //  * 请求左侧导航接口，获取左侧导航栏数据
  //  * */
  // getLeftNavData(){
  //   return {
  //     list:[
  //       {
  //         link:"123123",
  //         isSelected:1,
  //         dataType:"1",
  //         name:"商品1"
  //       },
  //       {
  //         link:"123123",
  //         isSelected:1,
  //         dataType:"1",
  //         name:"商品2"
  //       },
  //       {
  //         link:"123123",
  //         isSelected:1,
  //         dataType:"1",
  //         name:"商品3"
  //       },
  //       {
  //         link:"123123",
  //         isSelected:1,
  //         dataType:"1",
  //         name:"商品4"
  //       },
  //       {
  //         link:"123123",
  //         isSelected:1,
  //         dataType:"1",
  //         name:"商品5"
  //       },
  //       {
  //         link:"123123",
  //         isSelected:1,
  //         dataType:"1",
  //         name:"商品6"
  //       }
  //     ]
  //   }
  // }

    async filterBlankControllerActions() {
        let [currentController,currentAction] = [this.http.controller,this.http.action];
        let blankActions = [
            {
                controller:"login",
                actions:["index","login"]
            },
            {
                controller:"index",
                actions:["index"]
            }
        ];
        let flag = false;
        blankActions.forEach(function (item,index) {
            if(currentController == item.controller){
                if(item.actions.indexOf(currentAction) > -1){
                    flag = true;
                }
                return;
            }
        });
        if(!flag){
            let userInfo = await this.session("userInfo");
            if(think.isEmpty(userInfo)){
                return this.redirect("/business/login/index");
            }
        }
    }


}