const listUserScore = "SELECT * FROM Scores WHERE user_id = $1";
const addUSerQuizScore = "INSERT INTO Scores(score,score_date,quiz_id,user_id) VALUES($1,$2,$3,$4)";
const updateUserQuizScore = "UPDATE Scores SET score = $1,score_date = $2,quiz_id = $3,user_id = $4 WHERE id = $5";

module.exports = {
    listUserScore,
    addUSerQuizScore,
    updateUserQuizScore,
}