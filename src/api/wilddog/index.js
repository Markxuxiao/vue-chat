var wilddog = require('wilddog')


export default {
    init(){
        return new Promise(function (resolve, reject) {
            let config = {
                syncURL: "https://wd9687325801uajlmc.wilddogio.com" //输入节点 URL
            };
            wilddog.initializeApp(config);
            let connectedRef = wilddog.sync().ref("/.info/connected");
            connectedRef.on("value", (snap) => {
                if (snap.val() === true) {
                    console.log("connected");
                    // 当连接成功时，重新注册离线事件
                    var presenceRef = wilddog.sync().ref("disconnectmessage");
                    presenceRef.onDisconnect().set("I disconnected!");

                    resolve()
                } else {
                    console.log("not connected");
                }
            },(error)=>{reject(error)})
        })
    },
    // 手动重连
    connect() {
        wilddog.sync().goOnline();
    },
    // 手动断开连接
    disconnect() {
        wilddog.sync().goOffline();
    },
    sendMessage(id,message) {
        let messageRef = wilddog.sync().ref(id);
        return new Promise(function (resolve, reject) {
            messageRef.push(message, function (error) {
                if (error == null) {
                    resolve(message);
                } else {
                    reject(error)
                }
            });
        })
    },
}
