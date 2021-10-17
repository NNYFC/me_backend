const searchAnswer = "SELECT *FROM Answers WHERE id = $1";
const listAnswersByQuestionsId = "SELECT * FROM Answers WHERE question_id = $1";
const addQuestionAnswers = "INSERT INTO Answers(answer,correct,question_id) VALUES($1,$2,$3)";
const updateAnswersById = "UPDATE Answers SET answer=$2,correct=$3 WHERE id = $1";
const removeAnswer = "DELETE FROM Answers WHERE id = $1";

module.exports = {
    searchAnswer,
    listAnswersByQuestionsId,
    addQuestionAnswers,
    updateAnswersById,
    removeAnswer
}