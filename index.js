let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let path = require('path');
let express = require('express');

app.use('/', express.static(path.join(__dirname + '/public')));
app.get('/admin', function(req, res){
    res.sendFile(__dirname + '/public/admin.html');
});

io.on('connection', function(socket){
    console.log('New user connected', socket.id);
    socket.on('newCode', function(msg){
        io.emit('newCode', msg);
    });
});

http.listen(3000, function(){
    console.log('Listening on *:3000');
});