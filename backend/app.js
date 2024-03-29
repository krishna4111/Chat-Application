const express = require("express");
const cors = require("cors");
const app = express();
const bodyPaer = require("body-parser");
const sequelize=require('./util/database');
const UserRoutes=require('./router/userroutes');
const ChatRoutes=require('./router/chatroutes');
const GroupRoutes=require('./router/grouproutes');
const GroupChat=require('./router/groupchat');
const User=require('./model/user');
const Chat=require('./model/chat');
const Group=require('./model/group');
const UserGroup=require('./model/usergroup');

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

User.hasMany(Chat);
Chat.belongsTo(User);

Group.belongsToMany(User , {through : UserGroup});
User.belongsToMany(Group , {through : UserGroup});

Group.hasMany(Chat);
Chat.belongsTo(Group);



sequelize
 //.sync({ force: true })
 .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });