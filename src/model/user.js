const getUsers = "SELECT * FROM Users";
const getUserById = "SELECT * FROM Users WHERE id = $1";
const searchUser = "SELECT * FROM Users WHERE email = $1 AND user_password = $2";
const checkRoleExist = "SELECT *FROM Roles WHERE roles = $1";
const addRole = "INSERT INTO Roles(roles) VALUES($1)";
const listRoles = "SELECT * FROM Roles";
const checkEmailExist = "SELECT *FROM Users WHERE email = $1";
const addSpecialist = "INSERT INTO Users(firstname,lastname,gender,age,email,country,address,workdomain,pseudo,user_password,role_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
//const addYouth = "INSERT INTO Users(firstname,lastname,gender,age,email,country,address,pseudo,user_password,role_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
const updateUserDetail = "UPDATE Users SET firstname=$2,lastname=$3,gender=$4,age=$5,email=$6,country=$7,address=$8,workdomain=$9,pseudo=$10,user_password=$11 WHERE id = $1";
const listThemeQuizScoreByUserId = "SELECT DISTINCT Users.pseudo,Quiz.quiz,Scores.score,Scores.score_date FROM Users JOIN Scores ON Users.id = Scores.user_id JOIN Quiz ON Scores.quiz_id = Quiz.id JOIN Themes ON quiz.theme_id = themes.id WHERE Users.id = $1 AND Themes.id = $2";
const sendChatWithUser = "INSERT INTO Chats(chat_text,send_date,unread,sender_id,receiver_id) VALUES($1,$2,$3,$4,$5)";


module.exports = {
    getUsers,
    getUserById,
    searchUser,
    checkRoleExist,
    addRole,
    listRoles,
    addSpecialist,
    checkEmailExist,
    updateUserDetail,
    listThemeQuizScoreByUserId,
    sendChatWithUser
}