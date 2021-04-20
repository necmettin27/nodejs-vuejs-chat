var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var users = [];
var messages = [];

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

io.on("connection",(socket)=>{
    socket.on("newUser",(userName)=>{
       users.push({
           name:userName
       });
       io.emit("users",users);
    });
    socket.on("sendMessageClient",(info)=>{
        messages.push(info);
        io.emit("messagesServer",messages);
    });
    
});

http.listen(3000,()=>{console.log("Sunucu başladı.")});