const express = require('express');
var http = require('http');
const cors = require('cors');
const userRoute = require('./src/view/user_route');
const themeRoute = require('./src/view/theme_route');
const quizRoute = require('./src/view/quiz_route');
const scoreRoute = require('./src/view/score_route');
const questionRoute = require('./src/view/question_route');
const answerRoute = require('./src/view/answer_route');
const testcentersRoute = require('./src/view/testcenters_route');
const chatsRoute = require('./src/view/chats_route');
const forumsRoute = require('./src/view/forum_route');
const messagesRoute = require('./src/view/messages_route');

const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require('socket.io')(server,{
    cors:
    {
        origin:"*"
    }
});

app.use(express.json());
app.use(cors());

app.use('/user',userRoute);
app.use('/theme',themeRoute);
app.use('/theme/quiz',quizRoute);
app.use('/theme/quiz/user/score',scoreRoute);
app.use('/question',questionRoute);
app.use('/answer',answerRoute);
app.use('/testcenter',testcentersRoute);
/*
app.use('/chat',chatsRoute);
*/
app.use('/forum',forumsRoute);
app.use('/message',messagesRoute);

io.on("connection",(socket)=>{
    console.log("connected");
    console.log(socket.id,"Has joined");
    socket.on("/test",(msg)=>{
        console.log(msg);
    });
    socket.on("/chat",(msg)=>{
        app.use('/chat',chatsRoute);
    });

    //socket chat

    /**
     * Obtiene los usuarios conectados
     */
     socket.on('chatList', async (userId) => {
        const result = await helper.getChatList(userId);

        this.io.to(socket.id).emit('chatListRes', {
            userConnected: false,
            chatList: result.usersList.rows
        });

        const user_data = await helper.getUserData(userId);
        socket.broadcast.emit('chatListRes', {
            userConnected: true,
            userId: userId,
            socket_id: socket.id,
            userData: user_data.rows[0]
        });
         /**
         * Obtain messages
         */
        socket.on('getMessages', async (data) => {
                const result = await helper.getMessages(data.fromUserId, data.toUserId);
                if (result === null) {
                    this.io.to(socket.id).emit('getMessagesResponse', { result: [], toUserId: data.toUserId });
                } else {
                    this.io.to(socket.id).emit('getMessagesResponse', { result: result.rows, toUserId: data.toUserId })
                }
         });
         /**
           * Send messages
         */
         socket.on('addMessage', async (response) => {
                response.date = new moment().format("Y-MM-D");

                response.time = new moment().format("hh:mm A");

                helper.insertMessages(response, socket);

                socket.to(response.toSocketId).emit('addMessageResponse', response);
               
         });
        socket.on('disconnect', async () => {
                const isLoggedOut = await helper.noVisible(socket.id);
                socket.broadcast.emit('chatListRes', {
                    userDisconnected: true,
                    socket_id: socket.id
                });
            });
         });

   
         io.use(async (socket, next) => {
            let userId = socket.request._query['id'];
            let userSocketId = socket.id;
            const response = await helper.addSocketId(userId, userSocketId);
            if (response && response !== null) {
                next();
            } else {
                console.error(`Socket connection failed, for  user Id ${userId}.`);
            }
        });

});

/*
//send to the server
io.emit("user_connected",name);
//send to server
io.on("user_connected",(name) =>{
    
})
*/
server.listen(port,"0.0.0.0",()=>{
    console.log("server started on port "+port);
});
