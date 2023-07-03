const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const chat=sequelize.define('chat',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    },
    msg:{
       type:Sequelize.STRING
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
module.exports=chat;