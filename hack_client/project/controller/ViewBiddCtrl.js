angular.module('app').controller('viewbiddCtrl', ['$scope', '$interval', '$http', 'socket', 'Authentication', function ($scope, $interval, $http, socket, Authentication) {
    $scope.selleraddcart = false;
    $scope.loggedInUser = JSON.parse(sessionStorage.getItem("userInfo")).name
    $scope.getAllChocolates = [];
    console.log('viewbiddCtrl controler')
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
    $scope.finished = function(choco, index) {
        $scope.getAllChocolates[index].sold = true;
        $scope.declareWiner(choco)
    }
    $scope.declareWiner = function(choco) {
        choco.userId = JSON.parse(sessionStorage.getItem('userInfo'))._id;
        choco.userName = JSON.parse(sessionStorage.getItem('userInfo')).name;
        
        $http.post(Authentication.serverUrl+'/updateWiner', choco).then(function successCallback(response) {
                console.log(JSON.stringify(response));
                if (response.data.success) {
                } else {
                    //alert("unable to fetch the list");
                }
            }, function errorCallback(err) {
                alert("Server Error");
            });
    }
    
    
    
   $scope.getChocolates = function(){
        var sellerId = JSON.parse(sessionStorage.getItem('userInfo'))._id;
       console.log(sessionStorage.getItem('userInfo'),'seller Info')
       if(JSON.parse(sessionStorage.getItem('userInfo')).role.toLowerCase() == 'seller') {
           $scope.isHeSeller = true
       } else {
           $scope.isHeSeller = false
       }
         var data = {'sellerId':sellerId};
        //  console.log(data)
        // $http.post('http://dba27cf3.ngrok.io/chocoapi/getItem',data).success(function (data){
         
        //     $scope.getAllChocolates = data;
        // }).error(function(err){
        //     console.log(err)
        // });

$http.post(Authentication.serverUrl+'/getAuction').then(function successCallback(response) {
                console.log(JSON.stringify(response));
                if (response.data.success) {
                   $scope.getAllChocolates = response.data.auctionList;
                } else {
                    alert("unable to fetch the list");
                }
            }, function errorCallback(err) {
                alert("Server Error");
            });
    }

    // $scope.choco1Values = [20, 45, 25, 30, 55, 70];
    // $scope.choco2Values = [30, 80, 41, 22, 39, 78];
    // $scope.choco3Values = [1, 11, 81, 15, 20, 65];
    
//     $scope.calculateMean = function(chocArr){
//     var sum = 0; 
//     for(var i = 0; i < chocArr.length; i++){
//         sum += parseInt(chocArr[i], 10); //don't forget to add the base 
//     }
//     var avg = sum/chocArr.length;
//     $scope.suggestedPrice= avg; 
// }

// $scope.calculateMedian = function(chocArr) {

//     // extract the .values field and sort the resulting array
//     var m = chocArr.map(function(v) {
//         return v.values;
//     }).sort(function(a, b) {
//         return a - b;
//     });

//     var middle = Math.floor((m.length - 1) / 2); // NB: operator precedence
//     if (m.length % 2) {
//         $scope.suggestedPrice =  m[middle];

//     } else {
//         $scope.suggestedPrice = (m[middle] + m[middle + 1]) / 2.0;
//     }

// }

 $scope.random = function(arrayId,sp,aucid,chocid,br,chocoName){
$scope.bidstartingPrice = sp;
$scope.chocid = chocid;
$scope.auctionId = aucid;
$scope.biddingRate = br;
$scope.chocoName = chocoName;


    // var randomNo = Math.random()*10;
    // if(randomNo % 2 == 0 || randomNo == 0 ){
    //     switch(arrayId){
    //         case 0:  $scope.calculateMedian($scope.choco1Values);
    //         break;
    //         case 1:  $scope.calculateMedian($scope.choco2Values);
    //         break;
    //         case 2:  $scope.calculateMedian($scope.choco3Values);
    //         break;
    //     }
        
    // }else{
    //     switch(arrayId){
    //         case 0:  $scope.calculateMean($scope.choco1Values);
    //         break;
    //         case 1:  $scope.calculateMean($scope.choco2Values);
    //         break;
    //         case 2:  $scope.calculateMean($scope.choco3Values);
    //         break;
    //     }
        
    // }

}


$scope.addBid = function(bv,aid,cid,chocoName){
    //$scope.addBid = navigator.userAgent.toLowerCase();
    var uId = JSON.parse(sessionStorage.getItem('userInfo'))._id;

   
    var data = {
        userId:uId, bidPrice: bv, chocoId: cid, auctionId: aid, userAgent: navigator.appName, userPlatfrom: navigator.platform,
        chocoName: chocoName
    };

    $http.post(Authentication.serverUrl+'/addBid', data).then(function successCallback(response) {
                console.log(JSON.stringify(response));
                if (response.data.success) {
                   $scope.getAllChocolates = response.data.auctionList;
                    $('#myModal1').modal('hide');
                    $scope.getChocolates()
                } else {
                    $('#myModal1').modal('hide');
                    $scope.getChocolates()
                    alert(response.data.msg);
                }
            }, function errorCallback(err) {
                alert("Server Error");
            });
    // if()

}

    // $scope.suggestedPrice = 

 $scope.testVal ="Welcome"
 $scope.timer = function() {
        var intervalId;
        $scope.counter = 0;
        $scope.initialCountdown = 100000;
        
        $scope.countdown = $scope.initialCountdown;
        var startTime = new Date();
        //console.log(startTime);
        intervalId = $interval(function() {
            var actualTime = new Date();
            $scope.counter = Math.floor((actualTime - startTime)/1000);
            $scope.countdown = $scope.initialCountdown - $scope.counter;
            // if ($scope.countdown == 0) {
            //     $scope.onlineTestSubmitModal = true;
            //     $scope.onlineTestCompletedMsgModal = true;
            //     $scope.onlineTestTimeOutMsgModal = false;
            //     // $("#onlineTestDialogAlert").modal();
            // }
        }, 1000);
    };
    

     $scope.timer();
    /*  Watch Happens For Every Sec.*/
    $scope.$watch('countdown', function(countdown) {
       // console.log(countdown)
        //console.log($scope.countdown)
        if (countdown === 0) {
            $scope.stop();
        }
    });
    /*Stop Called When Count down Stops.*/
    $scope.stop = function() {
        $interval.cancel(intervalId);
    };

    $scope.getChocolates();
    
 
 var winowH = angular.element(window).innerHeight();
 var titleH = angular.element('.title ').outerHeight()
 var thheight =angular.element('thead').outerHeight()
 var actulaHeigth = winowH - titleH - thheight
 
 var hh = angular.element('.table-fixed tbody')
 hh.css({'height':actulaHeigth})
 
 
 
 
     
}])

.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);
