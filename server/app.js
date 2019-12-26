const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
  console.log('IO Connected');
  
  socket.on('createMessage', data => {
    console.log(data.text);
    setTimeout(() => {
      socket.emit('newMessage', {
        text: data.text + ' SERVER'
      });
    }, 1000);
  });
  
});

module.exports = {
  app,
  http
};
