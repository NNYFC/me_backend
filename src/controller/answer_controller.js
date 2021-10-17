const answerquery = require('./../model/answer');
const pool = require('./../db');


const listAnswers= (req,res) => {
    pool.query(answerquery.listAnswersByQuestionsId,(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};


const createAnswers = (req,res) => {
    const {answer,correct,question_id} = req.body;

     pool.query(answerquery.addQuestionAnswers,[answer,correct,question_id],(error,result) => {
         if(error) throw error;
         res.status(201).send("The Question answer successfully added !");
     });
}


const updateAnswers = (req,res) => {
    const id = parseInt(req.params.id);
    const {answer,correct} = req.body;

    pool.query(answerquery.searchAnswer,[id], (error,results) => {
        const noCriteriaFound = !results.rows.length;
        if(noCriteriaFound){
            res.send("No Answer with the id specified");
        }else{
            pool.query(answerquery.updateAnswersById,[id,answer,correct], (error,results) => {
                if(error) throw error;
                res.status(200);
            });
            pool.query(answerquery.searchAnswer,[id], (error,results) => {
                if(error) throw error;
                res.status(200).json(results.rows);
            });
        }
    });
}

const deleteAnswer = (req,res) => {
    const id = req.params.id;
    //checking answer exist
    pool.query(answerquery.searchAnswer,[id], (error,results) => {
        if(results.rows.length){
            pool.query(answerquery.removeAnswer,[id],(error,result) => {
                if(error) throw error;
                res.status(201).send(" Answer successfully deleted !");
            });
        }else{
            res.status(400).send("Answer does not exist");
        }
        
    });
}


module.exports = {
    listAnswers,
    createAnswers,
    updateAnswers,
    deleteAnswer
};