app.factory('socket', function($rootScope, Authentication) {


var socket = io.connect(Authentication.serverUrl);
return {
on: function(eventName, callback) {
    console.log(eventName, callback,'eventName, callback')
socket.on(eventName, callback);
},
emit: function(eventName, data, callback) {
socket.emit(eventName, data, callback)
}

};
}); 