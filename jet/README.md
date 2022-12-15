## 项目结构

```
app
├── common
│   └── adapter
├── core
│   ├── entity
│   ├── event
│   ├── service
│   └── util
├── port
│   └── controller
├── repository
│   └── model
├── infra
│   └── xxxxAdapter
└── test
    ├── control
    │   └── response_time.test.js
    └── controller
        └── home.test.js
```

common：通用目录
- util：全局工具类
- adapter：外部服务调用
- enum: 枚举集合
- constants: 常量集合

core：核心目录
- entity：核心模型，实现业务行为
- event：异步事件定义，以及消费，串联业务
- service：核心业务
- util：服务 core 内部，不对外暴露

repository： 仓库目录
- model：ORM 模型，数据定义
- XXXRepository: 仓储接口，存储、查询过程

port：
- controller：HTTP controller

infra: 基础设施
- xxxxAdapter: 消息队列服务适配器、文件服务适配器、数据缓存服务适配器 等

## Controller 开发指南

## Service 开发指南

## Repository 开发指南

### Repository 类方法命名规则

- `findSomething` 查询一个模型数据
- `saveSomething` 保存一个模型数据，包含新增、更新逻辑，尽量不单独区分
- `removeSomething` 移除一个模型数据
- `listSomethings` 查询一批模型数据

## DDD 常见问题答疑

### 为什么有了 Model 之后还需要一层 Entity 的封装

请先阅读「[领域驱动设计](https://www.yuque.com/liberty/rf322x)」
