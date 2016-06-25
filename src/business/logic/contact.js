/**
 * Created by Moment on 16/6/23.
 */
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    addAction(){
        this.rules={
            name:"required",
            email:"required",
            message:"required"
        };
        //只允许 POST 请求类型
        this.allowMethods = "post";
    }
    getAction(){
        this.rules={
            userId:"required"
        }
    }
    listAction(){
        //只允许 GET 请求类型
        this.allowMethods = "get";
    }
    deleteAction(){
        this.rules={
            id:"required"
        };
        //只允许 POST 请求类型
        this.allowMethods = "post";
    }
}