## express-jwt 一个简单的 express 中实现 jwt 的 demo

### npm scripts
#### 启动项目
`npm start`

### 接口文档

接口文档使用 `apidoc` 生成， `npm run api` 后访问 http://localhost:5000/docs

### 主要流程

访问 `/login` （一般是登录或注册接口），基于 `jwt`  生成 `token` 返回给前端。

前端放到本地存储（localStorage 或者 cookie）里面，后面的请求带上 `token` （一般通过 header 传递）。

后端程序在所有路由前面加入一个 认证功能 的中间件，主要负责验证 `token` 不存在或者错误的情况，直接返回 `401`，对于 `/login` 这类接口（不需要 token 的）要在认证范围之外。

如果有的接口需要当前登录人 `uerId`，前端是不用传的，后端在验证解密 `token` 后，将 `token` 里的用户信息挂载到请求实例 `app` 上，这样后面的路由都可以访问到 当前登录人用户信息了。