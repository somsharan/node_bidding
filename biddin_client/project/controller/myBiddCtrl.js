angular.module('app').controller('myBiddCtrl', ['$scope','$http', 'Authentication', function ($scope,$http, Authentication) {
    $scope.loggedInUser = JSON.parse(sessionStorage.getItem("userInfo")).name
    var vlv = this;
  $scope.selleraddcart = false; 
  if(sessionStorage.getItem('role').toLowerCase() == 'user'){
        $scope.selleraddcart = true;
      }   
        
 $scope.openNavi = function(){
     document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("open").style.display = "none";
     
 }
 $scope.closeNavi = function(){
     document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("open").style.display = "block"
     
 }

 $scope.viewMyBid = function(){
var uri = ''
if(sessionStorage.getItem('role').toLowerCase() == 'user'){
    data = {"userId":JSON.parse(sessionStorage.getItem("userInfo"))._id};
    $scope.isSeller = false;
    uri = Authentication.serverUrl+"/getBid"
} else {
    data = {"sellerId":JSON.parse(sessionStorage.getItem("userInfo"))._id};
    $scope.isSeller = true;
    uri =  Authentication.serverUrl+"/getSellerAuction"
} 
$http.post(uri,data).then(function successCallback(response) {
                console.log(JSON.stringify(response));
                if (response.data.success) {
                   $scope.getMyBids = response.data.myList;
                } else {
                    alert("unable to fetch the list");
                }
            }, function errorCallback(err) {
                alert("Server Error");
            });
 }

 $scope.viewMyBid();

 var winowH = angular.element(window).innerHeight();
 var titleH = angular.element('.title ').outerHeight()
 var thheight =angular.element('thead').outerHeight()
 var actulaHeigth = winowH - titleH - thheight
 
 var hh = angular.element('.table-fixed tbody')
 hh.css({'height':actulaHeigth})
 
    
}]);