const { Bootstrap } = require('@midwayjs/bootstrap');

process.env.NODE_ENV = 'prod';

Bootstrap.configure({
  imports: require('./dist/index'),
  moduleDetector: false,
}).run();
