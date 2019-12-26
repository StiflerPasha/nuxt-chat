const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const m = (name, text, id) => ({ name, text, id });

io.on('connection', socket => {
  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) {
      return cb('Данные некоректны');
    }
    
    socket.join(data.room);
    cb({ userId: socket.id });
    socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}`));
    
    socket.emit('newMessage', m('masha', `Hello, how are you?`));
    
    socket.broadcast.to(data.room)
      .emit('newMessage', m('admin', `Пользователь ${data.name} зашел.`));
  });
  
  
  socket.on('createMessage', data => {
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
