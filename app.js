const express = require("express");
const cors = require("cors");
const app = express();
const bodyPaer = require("body-parser");
const path=require('path');
const sequelize=require('./util/database');
const UserRoutes=require('./router/userroutes');
const ChatRoutes=require('./router/chatroutes');
const GroupRoutes=require('./router/grouproutes');
const GroupChat=require('./router/groupchat');
const User=require('./model/user');
const Chat=require('./model/chat');
const Group=require('./model/group');
const UserGroup=require('./model/usergroup');
const MultiMediaRouter=require('./router/multimediachat');
const ArchiveChat=require('./controller/archiveChat');


const http = require('http');
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server, {
  cors: {
    origin: '*'
  }
})

app.use(ArchiveChat.job());
app.use(bodyPaer.json());


app.use(cors({
   origin:"*",
   credentials:true,
   methods: "GET, POST, PUT, DELETE"
}));

app.use('/user',UserRoutes);
app.use('/chat',ChatRoutes);
app.use('/group',GroupRoutes);
app.use('/groupchat',GroupChat);
app.use('/file',MultiMediaRouter)


io.on('connection' , socket =>{
  socket.on('send-message' , (message)=>{
    console.log('message>>>>',message);
    io.emit('receive',message);
    
  })
})



User.hasMany(Chat);
Chat.belongsTo(User);

Group.belongsToMany(User , {through : UserGroup});
User.belongsToMany(Group , {through : UserGroup});

Group.hasMany(Chat);
Chat.belongsTo(Group);

app.use((req,res)=>{
  res.sendFile(path.join(__dirname , `public/${req.url}`))
})


sequelize
 //.sync({ force: true })
 .sync()
  .then((result) => {
    //app.listen(3000);
    server.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });