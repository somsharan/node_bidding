angular.module('app').factory('Authentication', function($http) {
    var serverUrl = 'http://df75cf02.ngrok.io/chocoapi';
    
    return {
        serverUrl : serverUrl
    }

})