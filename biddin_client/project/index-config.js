
angular.module('app').config(function($routeProvider, $locationProvider){
    
    $routeProvider.when('/',{
        templateUrl : 'views/login.html'
        , controller:'loginCtrl'
        , controllerAs :'login'
    }).when('/statistcs',{
        templateUrl : 'views/statistcs.html'
        , controller:'statCtrl'
        , controllerAs :'stat'
        
    }).when('/viewBidds',{
        templateUrl : 'views/viewBidd.html'
        , controller:'viewbiddCtrl'
        , controllerAs :'intrest'
        
    }).when('/myBidds',{
        templateUrl : 'views/myBidd.html'
        , controller:'myBiddCtrl'
        , controllerAs :'favr'
        
    }).when('/seller',{
        templateUrl : 'views/seller.html'
        , controller:'sellerCtrl'
        , controllerAs :'seller'
        
    }).otherwise({
        redirectTo:'/viewBidds'
    })
    
    //$locationProvider.html5Mode(true).hashPrefix('*');
   
    
}).run(function($rootScope, $location, $http, socket) {
    $rootScope.logoutUser = function() {
        sessionStorage.removeItem("userInfo");
        sessionStorage.removeItem('userIp', $rootScope.userIp);
    }
    socket.on('auctionData', function(acdata){
        console.log(acdata,'acdataacdataacdata')
    })
    
    $rootScope.$watch(function() { 
      return $location.path(); 
    },
    function(a){  
      if(!sessionStorage.getItem("userInfo")) {
           $location.path('/'); 
      }
    });
    var url = "http://freegeoip.net/json/";
      $http.get(url).then(function(response) {
        console.log(response.data.ip);
        $rootScope.userIp = response.data.ip;
          sessionStorage.setItem('userIp', $rootScope.userIp);
      });
})


angular.module('restvenky',[]).config(function($routeProvider, $locationProvider){
    
    $routeProvider.when('/',{
        templateUrl : 'views/resthome.html'
        , controller:'resthomeCtrl'
        , controllerAs :'rhm'
    }).otherwise({
        redirectTo:'/'
    })
    
    $locationProvider.html5Mode(true);
    
})



