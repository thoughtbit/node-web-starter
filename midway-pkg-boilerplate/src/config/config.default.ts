import { join } from 'path';
import { tmpdir } from 'os';
import * as dotenv from 'dotenv';
import { MidwayConfig } from '@midwayjs/core';

// load .env file in process.cwd
dotenv.config();

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1665821339926_6940',
  koa: {
    port: parseInt(process.env.PROT),
  },

  staticFile: {
    dirs: {
      default: {
        prefix: '/',
        alias: {
          '/': '/index.html',
        },
        dir: process.env.PUBLIC_PATH,
      },
    },
  },
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '10mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: ['.xml'],

    // tmpdir: string，上传的文件临时存储路径
    tmpdir: join(tmpdir(), 'ipc-upload-files'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 5 * 60 * 1000,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
  },

  // 自定义工作空间配置
  workspace: {
    dist: process.env.WORKSPACE_DIST_PATH,
  },
} as MidwayConfig;
