const express = require("express");
const cors = require("cors");
const app = express();
const bodyPaer = require("body-parser");
const sequelize=require('./util/database');
const UserRoutes=require('./router/userroutes');

app.use(bodyPaer.json());
app.use(cors());

app.use('/user',UserRoutes);


sequelize
  //.sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });