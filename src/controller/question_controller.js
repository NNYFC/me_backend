const questionquery = require('./../model/question');
const pool = require('./../db');


const listQuestions = (req,res) => {
    pool.query(questionquery.listQuestionsWithAnswwers,(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};


const createQuestions = (req,res) => {
    const {question,mark,quiz_id} = req.body;
    //checking question exist
    pool.query(questionquery.checkQuestionExist,[question], (error,results) => {
        if(results.rows.length){
            res.status(400).send("Question already exist");
        }else{
            pool.query(questionquery.addQuestion,[question,mark,quiz_id],(error,result) => {
                if(error) throw error;
                res.status(201).send(" Question successfully added !");
            });
        }
        
    });
}


const updateQuestions = (req,res) => {
    const id = parseInt(req.params.id);
    const {question,mark} = req.body;

    pool.query(questionquery.searchQuestion,[id], (error,results) => {
        const noCriteriaFound = !results.rows.length;
        if(noCriteriaFound){
            res.send("No Question with the id specified");
        }else{
            pool.query(questionquery.updateQuestion,[id,question,mark], (error,results) => {
                if(error) throw error;
                res.status(200);
            });
            pool.query(questionquery.searchQuestion,[id], (error,results) => {
                if(error) throw error;
                res.status(200).json(results.rows);
            });
        }
    });
}

const deleteQuestion = (req,res) => {
    const id = req.params.id;
    //checking question exist
    pool.query(questionquery.searchQuestion,[id], (error,results) => {
        if(results.rows.length){
            pool.query(questionquery.removeQuestion,[id],(error,result) => {
                if(error) throw error;
                res.status(201).send(" Question successfully deleted !");
            });
        }else{
            res.status(400).send("Question does not exist");
        }
        
    });
}


module.exports = {
    listQuestions,
    createQuestions,
    updateQuestions,
    deleteQuestion
};