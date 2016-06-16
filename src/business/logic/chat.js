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
        }
    }
}