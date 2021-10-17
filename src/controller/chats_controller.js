const chatsquery = require('./../model/chats');
const pool = require('./../db');


const listPrivateChat= (req,res) => {
    const {sender_id,receiver_id} = req.body;
    pool.query(chatsquery.listChatMessages,[sender_id,receiver_id],(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};

/* 
const createAnswers = (req,res) => {
    const {answer,correct,question_id} = req.body;

     pool.query(answerquery.addQuestionAnswers,[answer,correct,question_id],(error,result) => {
         if(error) throw error;
         res.status(201).send("The Question answer successfully added !");
     });
}
 */

const updateChatMessageStatus = (req,res) => {
    const id = parseInt(req.params.id);
    const {unread} = req.body;

    pool.query(chatsquery.checkChatsById,[id], (error,results) => {
        const noCriteriaFound = !results.rows.length;
        if(noCriteriaFound){
            res.send("No Chat message with the id specified");
        }else{
            pool.query(chatsquery.updateChatMessage,[id,unread], (error,results) => {
                if(error) throw error;
                res.status(200);
            });
            pool.query(chatsquery.checkChatsById,[id], (error,results) => {
                if(error) throw error;
                res.status(200).json(results.rows);
            });
        }
    });
}


const deletePrivateChat = (req,res) => {
    const id = req.params.id;
    
    pool.query(chatsquery.checkChatsById,[id], (error,results) => {
        if(results.rows.length){
            pool.query(chatsquery.removeChatMessage,[id],(error,result) => {
                if(error) throw error;
                res.status(201).send(" Message deleted !");
            });
        }else{
            res.status(400).send("Message does not exist");
        }
        
    });
}


module.exports = {
   listPrivateChat,
   updateChatMessageStatus,
   deletePrivateChat
};