/* global $ */
/* jshint -W117 */
(function () {
    'use strict';

    const socket = io(); // io.connect('localhost:80')

    const chatDiv = $('#chatDiv'),
          login = $('#login'),
          messagesDiv = $('#messages'),
          loginInput = $('#name'),
          messageInput = $('#message');

    chatDiv.hide();
    login.show();

    socket.on('intro&bye', info => {
        const toggle = info.intro ? 'joined' : 'left';
        $('<br/><span>' + info.name + ' has ' + toggle + ' the chat</span><br/><br/>')
        .appendTo(messagesDiv)
        [0].scrollIntoView();
    });
    
    socket.on('message', msg => {
        $('<span>' + msg.name + ': ' + msg.data + '</span><br/>')
        .appendTo(messagesDiv)
        [0].scrollIntoView();
    });
    
    $('#loginForm').submit(e => {
        e.preventDefault();
        socket.emit('login', loginInput.val());
        login.hide();
        chatDiv.show();
    });

    $('#messageForm').submit(e => {
        e.preventDefault();
        socket.emit('message', messageInput.val());
        messageInput.val('');
    });
}());
