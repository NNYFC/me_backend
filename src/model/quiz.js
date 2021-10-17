const listQuizByThemeId = "SELECT * FROM Quiz WHERE theme_id = $1";
const checkQuizExist = "SELECT * FROM Quiz WHERE quiz = $1";
const getQuizById = "SELECT * FROM Quiz WHERE id = $1";
const addQuiz = "INSERT INTO Quiz(Quiz,timer,theme_id) VALUES($1,$2,$3)";
const updateQuizDetails = "UPDATE Quiz SET quiz=$2,timer=$3 WHERE id = $1";


module.exports = {
    listQuizByThemeId,
    checkQuizExist,
    getQuizById,
    addQuiz,
    updateQuizDetails
}