const archiveChat=require('../model/archiveChat');
const CronJob = require("cron").CronJob;
const Chat=require('../model/chat')

const job = new CronJob(
    "0 36 3 * * *",
      async function () {
        const t = await sequelize.transaction();
  
        try {                                                          
          const data = await Chat.findAll();
          data.forEach(async (element) => {
            await archiveChat.create(
              {
                Message : element.msg,
                Name: element.username,
                userId: element.userId,
                groupId: element.groupId,
              },
              { transaction: t }
            );
          });
          await Chat.destroy({ where: {} }, { transaction: t });
          await t.commit();
        } catch (err) {
          await t.rollback();
  
          console.log(err);
        }
      },
      null,
      true
    ); 
    module.exports={
        job
    }