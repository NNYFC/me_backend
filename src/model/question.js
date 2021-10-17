const searchQuestion = "SELECT *FROM Questions WHERE id = $1";
const checkQuestionExist = "SELECT *FROM Questions WHERE question = $1";
const listQuestionsWithAnswwers = "SELECT DISTINCT Questions.question,Questions.mark,Answers.answer,Answers.correct FROM Questions JOIN Answers ON Questions.id = Answers.question_id WHERE Questions.quiz_id = $1";
const addQuestion = "INSERT INTO Questions(question,mark,quiz_id) VALUES($1,$2,$3)";
const updateQuestion = "UPDATE Questions SET question = $2,mark = $3 WHERE id = $1";
const removeQuestion = "DELETE FROM Questions WHERE id = $1";


module.exports = {
    searchQuestion,
    checkQuestionExist,
    listQuestionsWithAnswwers,
    addQuestion,
    updateQuestion,
    removeQuestion
}