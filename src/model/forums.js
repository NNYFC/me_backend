const listForums = "SELECT * FROM Forums";
const addForum = "INSERT INTO Forums(forum,create_date,user_id) VALUES($1,$2,$3)";
const updateForum = "UPDATE Forums SET forum = $2 WHERE id = $1"
const retreiveForumsMessages = "SELECT DISTINCT Forums.forum,Users.firstname,Users.pseudo,Messages.messages,Messages.send_date FROM Forums JOIN Messages ON Forums.id = Messages.forum_id JOIN Users ON Messages.user_id = Users.id";
const removeMessagesByForumId = "DELETE FROM Messages WHERE forum_id = $1";
const removeForum = "DELETE FROM Forums WHERE id = $1";
const checkForumExist = "SELECT *FROM Forums forum = $1";
const searchForumById = "SELECT *FROM Forums WHERE id = $1";

module.exports = {
    listForums,
    addForum,
    updateForum,
    checkForumExist,
    searchForumById,
    removeMessagesByForumId,
    removeForum,
    retreiveForumsMessages
}