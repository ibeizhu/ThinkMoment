/**
 * Created by Moment on 16/6/16.
 */
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    sendAction(){
        this.rules={
            relationId:"required",
            speakerId:"required",
            audienceId:"required",
            message:"required"
        };
        //只允许 POST 请求类型
        this.allowMethods = "post";
    }
    listAction(){
        this.rules={
            userId:"required"
        };
        //只允许 GET 请求类型
        this.allowMethods = "get";
    }
}