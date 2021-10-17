const listChatMessages = "SELECT * FROM Chats WHERE sender_id = $1 AND receiver_id = $2";
const removeChatMessage = "DELETE FROM Chats WHERE sender_id = $1 AND receiver_id = $2";
const updateChatMessage = "UPDATE Chats SET unread = $2 WHERE id = $1";
const checkChatsById = "SELECT *FROM Chats WHERE id = $1";

module.exports = {
    listChatMessages,
    updateChatMessage,
    removeChatMessage,
    checkChatsById
}