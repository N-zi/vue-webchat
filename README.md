﻿
### 项目启动
> 注意必须要有node、npm以及mongodb，项目默认mongodb IP地址为127.0.0.1:27017，可以在配置文件中修改。（chatServer\utils\database.js）
```
    cd chatRoom
    npm install 安装前端依赖
    npm run build 编译前端代码
    cd ..
    cd chatServer
    npm install 安装后端依赖
    npm run create 初始化数据库（号码池、表情包）
    npm start 启动服务
    在浏览器中打开 localhost:9988 即可
```



### 项目架构
* 技术栈

>  前端主要采用了vue全家桶，没什么多说的，脚手架构建项目，vuex状态管理，vue-router控制路由，axios进行前后端交互。后端是基于node搭的服务，用的是express。聊天最重要的当然是通信，项目用[socket.io](https://www.w3cschool.cn/socket/socket-1olq2egc.html)来进行前后端通信。

> 数据库是mongoDB，主要有用户、好友、群聊、消息、表情、号码池等。

* 功能概览


* 目录结构

```javascript
    // 前端
    ├─build
    ├─config
    ├─src
    │  ├─api                                  // 接口api
    │  ├─assets                               // 静态资源
    │  │  └─img
    │  ├─directives                           // 全局指令
    │  ├─libs                                 // 全局组件
    │  │  ├─bscroll
    │  │  ├─dropdown
    │  │  ├─icon
    │  │  ├─nodata
    │  │  ├─PhotoSwipe
    │  │  ├─uploadPopover
    │  │  └─vScroll
    │  ├─router                                // 路由
    │  ├─store                                 // 状态管理
    │  ├─utils                                 // 方法
    │  └─views
    │      ├─applicationModel
    │      │  ├─games                          // 游戏
    │      │  │
    │      │  └─sub                            // 应用
    │      ├─components                        // 组件
    │      │  ├─APlayer
    │      │  ├─chat
    │      │  ├─cropper
    │      │  ├─DPlayer
    │      │  └─header
    │      ├─personalModel                     // 主页
    │      │  ├─appModel                       // 天气等
    │      │  ├─friendModel                    // 好友
    │      │  └─groupModel                     // 群聊
    │      └─settingModel                      // 设置
    └─static
        ├─css                                  // 样式文件
        ├─font                                 // 字体文件
        └─theme                                // 主题
            └─vchat
```
### 功能设计
* 登录注册

>Vchat中用户注册时，会随机指定一个code号码，而这个code号是从预先生成的一个号码池（号码池存在mongodb）中取的。初始指定10000001-10001999的号码段为用户code, 100001-100999的号码段为群聊code。用户可以凭借code号或者账号登录。
```javascript
    // 号码池设计
    * code 号码
    * status 1 已使用 0 未使用
    * type  1 用户 2 群聊
    * random   随机数索引，用于随机查找某一条
    // user表主要字段
    * name 账号
    * pass 密码
    * avatar 头像
    * signature 个性签名
    * nickname 昵称
    * email 邮件
    * phone 手机
    * sex 性别
    * bubble 气泡
    * projectTheme 项目主题
    * wallpaper 聊天壁纸
    * signUpTime 注册时间
    * lastLoginTime 最后一次登录时间
    * chatColor 聊天文字颜色
    * province 省
    * city 市
    * town 县
    * conversationsList 会话列表
    * cover 封面列表
```
> 注册时，需要判断账号是否已存在，以及随机取得的code需要在号码池中标记为已被使用，用户密码用md5加密等。
``` javascript
    // md5 密码加密
    const md5 = pass => { // 避免多次调用MD5报错
        let md5 = crypto.createHash('md5');
        return md5.update(pass).digest("hex");
    };
```
> 登录同样需要判断用户是否已注册，以及支持账号和code两种方式登录。
``` javascript
    const login = (params, callback) => { // 登录
        baseList.users
            .find({ // mongodb中可以直接用$or表示或关系
                $or: [{"name": params.name}, {"code": params.name}]
            })
            .then(r => {
                if (r.length) {
                    let pass = md5(params.pass);
                    if (r[0]['pass'] === pass) {
                        //更新最后一次登录时间 此处直接写Date.now 会报错 需要Date.now()!!!;
                        baseList.users.update({name: params.name}, {lastLoginTime: Date.now()}).then(raw => {
                            console.log(raw);
                        });
                        callback({code: 0, data: {name: r[0].name, photo: r[0].photo}});
                    } else {
                        callback({code: -1});
                    }
                } else {
                    callback({code: -1});
                }
        })
    };
```
> 登录权限管理

1. 后端设置全局中间件，将没有登录的api请求统一返回status: 0
``` javascript
    app.use('/v*', (req, res, next) => {
        if (req.session.login) {
            next();
        } else {
            if (req.originalUrl === '/v/user/login' || req.originalUrl === '/v/user/signUp') {
                next();
            } else {
                res.json({
                    status: 0
                });
            }
        }
    });
```
2. 前端用axios统一设置拦截器
```javascript
// http response 服务器响应拦截器，这里拦截未登录和401错误，并重新跳入登页重新获取token
instance.interceptors.response.use(
    response => { // 拦截未登录
        if (response.data.status === 0) {
            router.replace('/');
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 这里写清除token的代码
                    router.replace('/');
            }
        }
        return Promise.reject(error.response.data)
    });
```
* 消息
> vchat中，消息种类包括好友或者加群申请、回复申请（同意or拒绝）、入群通知、聊天消息（文字、图片、表情、文件）


> 在实现消息发送之前，需要大体的了解一些`socket.io`的api。详细api文档可以查看[socket.io](https://www.w3cschool.cn/socket/socket-1olq2egc.html)
```javascript
    // 所有的消息请求都是建立在已连接的基础上的
    io.on('connect', onConnect);
    // 发送给当前客户端
    socket.emit('hello', 'can you hear me?', 1, 2, 'abc');
    // 发送给所有客户端，除了发送者
    socket.broadcast.emit('broadcast', 'hello friends!');
    // 发送给同在 'game' 房间的所有客户端，除了发送者
    socket.to('game').emit('nice game', "let's play a game");
    // 发送给同在 'game' 房间的所有客户端，包括发送者
    io.in('game').emit('big-announcement', 'the game will start soon');
```

1. 加入房间
> 加入会话列表中的房间，会话列表在好友申请成功或者加群成功时会自动添加。但是你也可以手动移除或添加，移除后将不会再收到被移除会话的消息（类似于屏蔽）。
``` javascript
    // 前端 发起加入房间的请求
    this.conversationsList.forEach(v => {
        let val = {
            name: this.user.name,
            time: utils.formatTime(new Date()),
            avatar: this.user.photo,
            roomid: v.id
        };
        this.$socket.emit('join', val);
    });
    // 后端 接受请求后执行加入操作，记录每个房间加入的成员，以及回信告知指定房间已上线成员
    socket.on('join', (val) => {
        socket.join(val.roomid, () => {
            if (OnlineUser[val.name]) {
                return;
            }
            OnlineUser[val.name] = socket.id;
            io.in(val.roomid).emit('joined', OnlineUser); // 包括发送者
        });
    });
```
2. 多房间
> 同时加入多个聊天房间会出现一个问题，socket可以加入多个房间并给指定房间发送消息，但是接受消息的时候并不会区分房间。换句话说，所有房间的消息，会一起发送给客户端。所以我们需要自己区分哪条消息是哪个房间的并进行分发。这样就需要一个房间标识来过滤，Vchat用的是房间id。

```javascript
    mes(r) { // 只有本房间的消息才展示
        if (r.roomid === this.currSation.id) {
            this.chatList.push(Object.assign({}, r, {type: 'other'}));
        }
    }
```
3. 发消息
```
    // 前端
    send(params, type = 'mess') { // 发送消息
        if (!this.message && !params) {
            return;
        }
        let val = {
            name: this.user.name,
            mes: this.message,
            time: utils.formatTime(new Date()),
            avatar: this.user.photo,
            nickname: this.user.nickname,
            read: [this.user.name],
            roomid: this.currSation.id,
            style: 'mess',
            userM: this.user.id
        };
        this.chatList.push(Object.assign({},val,{type: 'mine'})); // 更新视图
        this.$socket.emit('mes', val);
        this.message = '';
    }
    // 后端 接收消息后存储到数据库，并转发给房间内其他成员，不包括发送者。
    socket.on('mes', (val) => { // 聊天消息
        apiList.saveMessage(val);
        socket.to(val.roomid).emit('mes', val);
    });
```

4. 消息记录
> 所有的消息都会存到mongodb中，当切换房间的时候，会获取历史消息。而处在当前房间时，只会把最新消息追加到dom中，不会从数据库获取。聊天窗口默认只展示最新100条消息，更多消息可在聊天记录中查看。
```javascript
    // 前端 获取指定房间的历史消息
    this.$socket.emit('getHistoryMessages', {roomid: v.id, offset: 1, limit: 100});
    // 后端 关联表、分页、排序
    messages.find({roomid: params.roomid})
        .populate({path: 'userM', select: 'signature photo nickname'}) // 关联用户基本信息
        .sort({'time': -1})
        .skip((params.offset - 1) * params.limit)
        .limit(params.limit)
        .then(r => {
            r.forEach(v => { // 防止用户修改资料后，信息未更新
                if (v.userM) {
                    v.nickname = v.userM.nickname;
                    v.photo = v.userM.photo;
                    v.signature = v.userM.signature;
                }
            });
            r.reverse();
            callback({code: 0, data: r, count: count});
        }).catch(err => {
        console.log(err);
        callback({code: -1});
    });
```

 
