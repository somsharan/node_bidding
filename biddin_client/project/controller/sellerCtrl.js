angular.module('app').controller('sellerCtrl', ['$scope', '$http', '$location', 'Authentication', function($scope, $http, $location, Authentication) {
    if(JSON.parse(sessionStorage.getItem("userInfo")).role ==  'seller'){
        $scope.loggedInUser = JSON.parse(sessionStorage.getItem("userInfo")).name
    }
    
    var vlv = this;
    var chocoId;
    var token = sessionStorage.getItem("token");
    console.log("inside seller");

    $scope.getSellerItem = function() {
        var sellerid = JSON.parse(sessionStorage.getItem("userInfo"))._id;
        var seller = { sellerId: sellerid };
        $scope.chocholate = [];
        console.log(seller);
        console.log("inside getSellerItem");
        $http.post(Authentication.serverUrl+'/getItem', seller).then(function successCallback(response) {
            console.log(JSON.stringify(response));
            if (response.data.success) {
                console.log(response.data);
                $scope.chocholate = response.data.itemList;
            } else {
                alert(response.data.msg);
            }
        }, function errorCallback(err) {
            alert("Server Error");
        });

    }
    $scope.getSellerItem();
    $scope.addAuction = function(id) {
        data = {
            chocoId: $scope.chocholate[id]._id,
            startPrice: $scope.suggestedPrice,
            sellerId: JSON.parse(sessionStorage.getItem("userInfo"))._id,
            chocoName: $scope.chocholate[id].cName,
            chocoDesc: ''
        };


        $http.post(Authentication.serverUrl+'/addAuction', data).then(function successCallback(response) {
            console.log(JSON.stringify(response));
            if (response.data.success) {
                console.log(response.data);
                alert(response.data.msg)
                $location.path("/viewBidds");
            } else {
                alert("Unable to Bid");
            }
        }, function errorCallback(err) {
            alert("Server Error");
        });


    }
    $scope.findChocoId = function(id) {
        //chocoId = id;
        console.log($scope.chocholate[id])
    }

    $scope.openNavi = function() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("open").style.display = "none";

    }
    $scope.closeNavi = function() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("open").style.display = "block"

    }

    
    
       $scope.choco1Values = [20, 45, 25, 30, 55, 70];
     $scope.choco2Values = [30, 80, 41, 22, 39, 78];
     $scope.choco3Values = [1, 11, 81, 15, 20, 65];
    
    
var chocArr1 = [44,48,45,38,37,50,49,46,38,44,42,40,45,49,39,48,40,46,42,39,47,47,48,48,43,40,44,36,36,41,48,46,38,47,48,44,36,45,41,41,43,46,37,44,40,44]    
var chocArr2 =[49,49,46,48,50,53,54,49,51,54,48,48,48,53,50,52,52,53,50,48,47,50,53,51,53,53,48,51,51,46,51,54,53,46,47,48,49,52,47,47,49,49,54,51,51,49,49,51,52,50,47,49,51,54,52,50,52,52,49,50,53,48,50,51,47,52,52,49]
var chocArr3 = [35,35,34,39,34,36,39,38,39,35,34,34,36,37,39,34,39,36,37,39,39,35,36,37,35,38,39,36,34,36,39,37,35,36,38,37,35,35,37,36,34,39,37,39,39,38,38,36,36,38,36,37,39,37,37,37,35,37,38,34,36,36,38,36,35,37,35,39,34,34,39,35,36,38,35,38,35,39,39,39,34,37,39,34,39,35,37,37,34]

var  chocoPriceList = [[44,48,45,38,37,50,49,46,38,44,42,40,45,49,39,48,40,46,42,39,47,47,48,48,43,40,44,36,36,41,48,46,38,47,48,44,36,45,41,41,43,46,37,44,40,44],[49,49,46,48,50,53,54,49,51,54,48,48,48,53,50,52,52,53,50,48,47,50,53,51,53,53,48,51,51,46,51,54,53,46,47,48,49,52,47,47,49,49,54,51,51,49,49,51,52,50,47,49,51,54,52,50,52,52,49,50,53,48,50,51,47,52,52,49], [35,35,34,39,34,36,39,38,39,35,34,34,36,37,39,34,39,36,37,39,39,35,36,37,35,38,39,36,34,36,39,37,35,36,38,37,35,35,37,36,34,39,37,39,39,38,38,36,36,38,36,37,39,37,37,37,35,37,38,34,36,36,38,36,35,37,35,39,34,34,39,35,36,38,35,38,35,39,39,39,34,37,39,34,39,35,37,37,34]]

$scope.calculateMean = function(chocArr){
     var sum = 0; 
     for(var i = 0; i < chocArr.length; i++){
         sum += parseInt(chocArr[i], 10); //don't forget to add the base 
     }
     var avg = sum/chocArr.length;
     var avgValue = Math.floor(avg); 
    $scope.suggestedPriceList = []
    for(var i=0; i < 5;i++) {
        $scope.suggestedPriceList.push(avgValue+i)
    }
 } 
     

 $scope.calculateMedian = function() {

     // extract the .values field and sort the resulting array
     var m = chocArr.map(function(v) {
         console.log(v,'v')
         return v;
     }).sort(function(a, b) {
         return a - b;
     });

     var middle = Math.floor((m.length - 1) / 2); // NB: operator precedence
     if (m.length % 2) {         
         $scope.suggestedPrice =  m[middle];
         console.log($scope.suggestedPrice,'$scope.suggestedPrice')

     } else {
         $scope.suggestedPrice = (m[middle] + m[middle + 1]) / 2.0;
         console.log($scope.suggestedPrice,'$scope.suggestedPrice22')
     }

 }
 
 
$scope.$watch('chocId', function(chocId) {
        var chcocoArrayPriceList = []
        var rand = chocoPriceList[Math.floor(Math.random() * chocoPriceList.length)];
        if(chocId == 0) {
             $scope.calculateMean(chocArr1)
        } else if(chocId == 1){
            $scope.calculateMean(chocArr2)
        } else if(chocId == 2) {
            $scope.calculateMean(chocArr3)
        } else {
            $scope.calculateMean(rand)
        }
       
    });

}]);