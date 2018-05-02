"use strict"; 

const fs    = require('fs');
const https = require('https');

// express を使う
var express = require("express");
var app = express();
app.use(express.static(__dirname));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// 秘密鍵とデジタル証明書ファイルを指定
const options = { 
    key : fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// サーバ起動
https.createServer(options, app).listen(8443);

console.log('自己署名証明書サーバを起動');