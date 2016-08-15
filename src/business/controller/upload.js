/**
 * Created by Moment on 16/8/12.
 */
'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction(){
        return this.display();
    }
    
    /**
     * image action
     * @return {Promise} []
     */
    async imageAction(){
        let file = think.extend({}, this.file('images'));
        let uploadPath = think.RESOURCE_PATH + '/static/server/upload';
        think.mkdir(uploadPath);
        var basename = path.basename(file.path);
        fs.renameSync(file.path, uploadPath + '/' + basename);
        let filePath = '/static/server/upload' + '/' + basename;
        return this.success({filePath:filePath});
    }
}