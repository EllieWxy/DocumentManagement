# DocumentManagement

启动本系统你需要：

- 在`DocumentManagement&webapp`文件下分别进行一次`npm install`
- 在`DocumentManagement`文件夹下执行`node app.js`，在`webapp`文件夹下执行`npm run dev`
- 向`/clubreg`发送请求以注册社团信息
- 向`/reg`发送请求以注册本人信息

#### /api/common/clubReg

```javascript
//POST请求
body:{
  clubName : string //必填 其它选填
}
```

#### /api/common/reg

```javascript
//POST请求
body : {
  cid: String,
  user: String,
  password:String
}

```
