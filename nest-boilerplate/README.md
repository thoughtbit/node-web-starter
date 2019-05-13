# NestJS Boilerplate

## 项目结构
```bash
.
├── src                             
│   ├── main.ts             # 引入配置，启动主程序，引入各种全局服务
│   ├── app.module.ts       # 主程序根模块，负责各业务模块的聚合
│   ├── app.service.ts      # 主程序根服务
│   ├── app.controller.ts   # 主程序根控制器
│   ├── app.config.ts       # 主程序配置，数据库、程序、第三方，一切可配置项
│   ├── app.env.ts          # 全局环境变量
│   ├── modules                     
│   │   ├── 
│   │   ├── 
│   │   ├── 
│   │   ├── 
│   │   ├── 
│   │   ├── 
│   │   ├── 
│   │   │   ├── 
│   │   │   └── 
│   │   ├── 
│   │   ├──     
│   │   └──          
│   └── ...                 
└── README.md 
```


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```