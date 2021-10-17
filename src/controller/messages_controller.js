const messagesquery = require('./../model/messages');
const pool = require('./../db');


const listMessages= (req,res) => {
    const id = req.params.id;

    pool.query(messagesquery.listMessagesByForumId,[id],(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};


const sendMessagesInForum = (req,res) => {
    const {messages,send_date,forum_id,user_id} = req.body;

     pool.query(messagesquery.addMessagesByForumId,[messages,send_date,forum_id,user_id],(error,result) => {
         if(error) throw error;
         res.status(201).send("Forum Message send");
     });
}


const deleteForumMessages = (req,res) => {
    const id = req.params.id;
    //checking if forum exist
    pool.query(messagesquery.checkForumsExist,[id], (error,results) => {
        if(results.rows.length){
            pool.query(messagesquery.deleteMessagesByForumId,[id],(error,result) => {
                if(error) throw error;
                res.status(201).send(" All Forum messages successfully deleted !");
            });
        }else{
            res.status(404).send("Forum does not exist");
        }
        
    });
}


module.exports = {
    listMessages,
    sendMessagesInForum,
    deleteForumMessages
};