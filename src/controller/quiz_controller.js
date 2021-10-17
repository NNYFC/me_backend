const quizquery = require('./../model/quiz');
const pool = require('./../db');


const listThemeQuiz = (req,res) => {
    pool.query(quizquery.listQuizByThemeId,(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};




const createQuiz = (req,res) => {
    const {quiz,timer,theme_id} = req.body;
    //checking email exist
    pool.query(quizquery.checkQuizExist,[quiz], (error,results) => {
        if(results.rows.length){
            res.status(400).send("Quiz exist already");
        }else{
            pool.query(quizquery.addQuiz,[quiz,timer,theme_id],(error,result) => {
                if(error) throw error;
                res.status(201).send(" Quiz successfully added !");
            });
        }
        
    });
}


const updateQuiz = (req,res) => {
    const id = parseInt(req.params.id);
    const {quiz,timer} = req.body;

    pool.query(quizquery.getQuizById,[id], (error,results) => {
        const noCriteriaFound = !results.rows.length;
        if(noCriteriaFound){
            res.send("No Quiz with the id specified");
        }else{
            pool.query(quizquery.updateQuizDetails,[id,quiz,timer], (error,results) => {
                if(error) throw error;
                res.status(200);
            });
            pool.query(quizquery.getQuizById,[id], (error,results) => {
                if(error) throw error;
                res.status(200).json(results.rows);
            });
        }
    });
}


module.exports = {
    listThemeQuiz,
    createQuiz,
    updateQuiz,
};