/**
 * Created by Moment Wang on 2016/5/6.
 */

'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * 显示登录页面
     */
    indexAction(){
        return this.display();
    }
    /*
     * 登录检查请求的ticket，并写入session
     * */
    async loginAction(){
        let username = this.get("username");
        let password = this.get("password");
        if(!username || !password){
            
        }
        let userInfo = {
            userId:"user123",
            userName:"Only"
        };
        // 写入session
        await this.session("userInfo", userInfo);
        this.redirect("/business/index/index");
        this.success({
            msg:"Login in Success"
        });
    }
    /*
     * 登出action,清除session
     * */
    async logoutAction(){
        //清除当前用户的 session
        await this.session();
        this.success({
            msg:"Login out Success"
        });
    }
}