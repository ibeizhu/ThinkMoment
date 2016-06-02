'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '',
      database: 'moment',
      user: 'root',
      password: '',
      prefix: 'moment_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};