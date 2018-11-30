'use strict';

const sequelizeConfig = require('../database/config');

module.exports = appInfo => {
  const config = (exports = {});

  config.name = '网站名称';

  config.description = '网站描述';

  config.siteLogo = '/public/images/logo.svg';

  config.siteIcon = '/public/images/favicon.ico';

  // debug 为 true 时，用于本地调试
  config.debug = true;

  config.keys = appInfo.name;

  // add your config here
  config.middleware = [];

  config.logger = {
    consoleLevel: 'ERROR'
  };

  config.bodyParser = {
    formLimit: '500kb',
    jsonLimit: '500kb'
  };

  // change to your own sequelize configurations
  config.sequelize = sequelizeConfig;

  config.modelCommonOption = {
    underscored: false
  };

  return config;
};
