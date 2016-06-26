'use strict';

export default class extends think.controller.base {

  init(http) {
    super.init(http);
    this.topMenuData = {};
    this.leftNavData = {};
  }
  /*
   * 魔术方法,action之前调用
   * */
  async __before(){
    // // 头部菜单数据
    // this.topMenuData = await this.getTopMenuData();
    // // 左侧的导航栏数据
    // this.leftNavData = this.getLeftNavData();
      await this.filterBlankControllerActions();
      this.setEntryJsPath();
  }
  /*
  * 设置主人口js文件(entry.pack.js or entry.min.js)
  * */
  setEntryJsPath(){
      let jsDebug = this.http.get("jsDebug");
      let [packJs,uglifyJs] = ['entry.pack.js','entry.min.js'];
      let isLocalHost = this.http.hostname.indexOf("127.0.0.1") > -1?true:false;
      this.mediaPath = '/static/build/';
      if(!think.isEmpty(jsDebug) || isLocalHost){
          this.entryJs = `/static/build/modules/business/${ this.http.controller }/${ this.http.action }/${ packJs }`;
      }else{
          this.entryJs = `/static/build/modules/business/${ this.http.controller }/${ this.http.action }/${ uglifyJs }`;
      }
  }
    /*
     * 过滤控制器action白名单
     * */
    async filterBlankControllerActions() {
        let [currentController,currentAction] = [this.http.controller,this.http.action];
        let blankActions = [
            {
                controller:"login",
                actions:["index","login"]
            },
            // {
            //     controller:"index",
            //     actions:["index"]
            // },
            {
                controller:"chat",
                actions:["test","push","send","show"]
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
                if(this.isAjax()){
                    return this.error('NO_LOGIN');
                }else{
                    return this.redirect("/business/login/index");
                }
            }
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

}