angular.module('app').controller('loginCtrl', ['$scope', '$http', '$location', 'Authentication', function($scope, $http, $location, Authentication) {

    var data;
    // userForm.userName = "somesh@123.ew";
    // userForm.password = "123123";

     $scope.roleType = ["Seller", "User"];
    $scope.clicked = function(){   
      

        $location.path('/viewBidds');

        angular.element(document.querySelector('.modal-backdrop.in')).fadeOut();
    }
    var vlv = this;


    $scope.userLogin = function(userName) {
        if (userName == undefined) {
            alert("Please fill all fields");
        } else if (userName.emailData == "" || userName.emailData == " " || userName.emailData == 'undefined' || userName.password == "" || userName.password == " " || userName.password == 'undefined') {
            alert("Please fill all fields");
        } else
        if (!$scope.myform.email.$error.pattern) {
            data = { email: $scope.userForm.emailData, password: $scope.userForm.password };
            $http.post(Authentication.serverUrl+'/login', data).then(function successCallback(response) {
                console.log(JSON.stringify(response));
                if (response.data.success) {
                    sessionStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
                    sessionStorage.setItem("role", response.data.userInfo.role);

                    sessionStorage.setItem("token", response.data.token);


                    $location.path('/viewBidds');
                } else {
                    alert("login unsuccessfull");
                }
            }, function errorCallback(err) {
                alert("Server Error");
            });
        } else {
            alert("Email is not valid");
        }
    }



    $scope.registerUser = function(regForm) {

        if (regForm == undefined) {
            alert("Please fill all fields")
        } else if (regForm.FirstName == "" || regForm.LastName == "" || regForm.MobileNo == "" || regForm.Email == "" || regForm.Pwd == "" || regForm.ConfirmPwd == "" || regForm.FirstName == " " || regForm.LastName == " " || regForm.MobileNo == " " || regForm.Email == " " || regForm.Pwd == " " || regForm.ConfirmPwd == " " || regForm.FirstName == undefined || regForm.LastName == undefined || regForm.MobileNo == undefined || regForm.Email == undefined || regForm.Pwd == undefined || regForm.ConfirmPwd == undefined) {
            alert("please enter all fields");
        } else if (regForm.regPwd != regForm.regConfirmPwd) {
            alert("Password doesn't match");
        } else {
            data = { name: regForm.FirstName + " " + regForm.LastName, password: regForm.Pwd, email: regForm.Email, phone: regForm.MobileNo, role: regForm.role };
            $http.post(Authentication.serverUrl+'/register', data).then(function successCallback(response) {
                console.log(JSON.stringify(response));
                if (response.data.success) {

                    angular.element(document.querySelector('.modal-backdrop.in')).fadeOut();

                    //alert(response.data.msg); 
                     //$location.path('/viewBidds'); 
            }else{
                alert(response.data.msg);
            }
       }, function errorCallback(err){
            alert("Server Error");
       });
   }
   }
  


}]);