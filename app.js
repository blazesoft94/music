var socketIO = require("socket.io");
var Music = require("./src/musicSchema");
var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var mongoose = require("mongoose");
var port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://abrehman94:1234@ds239127.mlab.com:39127/music");
var db = mongoose.connection;
db.once("open",()=>{
    console.log("connected to database");
    io.on("connection", (socket)=>{
        socket.on("sendSongs",(command)=>{
            var cat = command=="all" ? /[.]*/ : command;
            Music.find({category:cat},(error,tracks)=>{
                console.log(tracks[0]);
                socket.emit("getSongs", {tracks});
            });
        });

    })
})
db.on("error",()=>console.log("error connecting to database"));

app.use(express.static(__dirname+"/public"));



server.listen(port,()=>{
    console.log("listening on",port);
});
