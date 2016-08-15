/**
 * Created by Moment on 16/8/15.
 */
'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * list action
     * @return {Promise} []
     */
    listAction(){
        let list = [
            {
                id:'1231',
                title:'文章1',
                description:'这是一个文章关于javascript',
                content:'1231231231',
                createTime:'123123123'
            },
            {
                id:'1232',
                title:'文章2',
                description:'这是一个文章关于javascript',
                content:'1231231231',
                createTime:'123123123'
            },
            {
                id:'1233',
                title:'文章3',
                description:'这是一个文章关于javascript',
                content:'1231231231',
                createTime:'123123123'
            }
        ];
        return this.success(list);
    }
}