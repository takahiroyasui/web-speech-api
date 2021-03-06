"use strict"; 

const fs = require('fs');
const player = require('node-wav-player');

// express
const app = require('express')();
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// 秘密鍵とデジタル証明書ファイルを指定
const options = {
    key : fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// https Server
const server = require('https').Server(options, app);
server.listen(8443);
console.log('自己署名証明書サーバを起動');

// socket.io
const io = require('socket.io')(server);
io.on('connection', socket => {
    let isPlay = true;
    console.log('a user connected');

    socket.on('send', text => {
        console.log('recog text: ' + text);
        if (isPlay && text == 'ピカチュウ') {
            player.play({path: './pikachu.wav',});
            isPlay = false;
        }
    });

    socket.on('end', () => {
        isPlay = true;
    });
});
