/**
 * Created by Moment on 16/6/29.
 */
'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction(){
        return this.display();
    }

    /**
     * chat action
     * @return {Promise} []
     */
    chatAction(){
        return this.display();
    }
}