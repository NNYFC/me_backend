const scorequery = require('./../model/scores');
const pool = require('./../db');


const listScore = (req,res) => {
    const {id} = req.params.id;
    pool.query(scorequery.listUserScore,[id],(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};




const createScore = (req,res) => {
    const {score,score_date,quiz_id,user_id} = req.body;
    
    pool.query(scorequery.addUSerQuizScore,[score,score_date,quiz_id,user_id],(error,result) => {
                if(error) throw error;
                res.status(201).send(" Score successfully added !");
    });
}


const updateScore = (req,res) => {
    const id = parseInt(req.params.id);
    const {score,score_date,quiz_id,user_id} = req.body;

    pool.query(scorequery.listUserScore,[id], (error,results) => {
        const noCriteriaFound = !results.rows.length;
        if(noCriteriaFound){
            res.send("No score for these user id");
        }else{
            pool.query(scorequery.updateUserQuizScore,[score,score_date,quiz_id,user_id,id], (error,results) => {
                if(error) throw error;
                res.status(200);
            });
            pool.query(scorequery.listUserScore,[id], (error,results) => {
                if(error) throw error;
                res.status(200).json(results.rows);
            });
        }
    });
}


module.exports = {
    listScore,
    createScore,
    updateScore,
};