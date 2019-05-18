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

##
```
npx ts-node src/generate-typings.ts
```

## JWT_SECRET_KEY 生成
```bash
$ openssl rand -base64 64
```

## 用户证书的生成
生成私钥（.key）–> 生成证书请求（.csr）–> 用CA根证书签名得到证书（.crt）

服务器端用户证书
```bash
openssl genrsa -des3 -out server.key 1024 
openssl req -new -key server.key -out server.csr
openssl ca -in server.csr -out server.crt -cert ca.crt -keyfile ca.key
```

客户端用户证书
```bash
openssl genrsa -des3 -out client.key 1024 
openssl req -new -key client.key -out client.csr
openssl ca -in client.csr -out client.crt -cert ca.crt -keyfile ca.key
```

生成pem格式证书
有时需要用到pem格式的证书，可以用以下方式合并证书文件（crt）和私钥文件（key）来生成

```bash
cat client.crt client.key > client.pem 
cat server.crt server.key > server.pem
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