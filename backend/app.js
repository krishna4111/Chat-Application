const express = require("express");
const cors = require("cors");
const app = express();
const bodyPaer = require("body-parser");
const sequelize=require('./util/database');
const UserRoutes=require('./router/userroutes');
const ChatRoutes=require('./router/chatroutes');
const User=require('./model/user');
const Chat=require('./model/chat')

app.use(bodyPaer.json());
app.use(cors({
   origin:"*",
   credentials:true,
   methods: "GET, POST, PUT, DELETE"
}));

app.use('/user',UserRoutes);
app.use('/chat',ChatRoutes);

User.hasMany(Chat);
Chat.belongsTo(User);


sequelize
 // .sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });