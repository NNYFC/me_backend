const listMessagesByForumId = "SELECT DISTINCT Users.firstname,Users.pseudo,Messages.messages,Messages.send_date FROM Messages JOIN Users ON Users.id = Messages.user_id WHERE forum_id = $1";
const addMessagesByForumId = "INSERT INTO Messages(messages,send_date,forum_id,user_id) VALUES($1,$2,$3,$4)";
const deleteMessagesByForumId = "DELETE FROM Messages WHERE forum_id = $1";
const checkForumsExist = "SELECT * FROM Forums WHERE id = $1";

module.exports = {
    listMessagesByForumId,
    addMessagesByForumId,
    deleteMessagesByForumId,
    checkForumsExist
}