app.controller('UserCtrl', function ($scope, $stateParams, ionicMaterialInk, $ionicPopup, $timeout, authService, $state,$window) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    // Toggle Code Wrapper
    var code = document.getElementsByClassName('code-wrapper');
    for (var i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }
    var userInfo = JSON.parse($window.localStorage["userInfo"]);
    $scope.getUserListing = function () {
        authService.getAllUserswithCountry().then(function (data) {
            $scope.userList=[];
            for (var i = 0; i < data.length; i++)
            {
                if (data[i].User_Id != userInfo.userId)
                {
                    $scope.userList.push(data[i]);
                }
            }
        }, function (err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'There is some error. Please try again later.'
            });
        });
    };
   

    $scope.getUserListing();
    $scope.goToChat = function (userId,name,imagePath)
    {
        var userDetails = { userId: userId, name: name, imagePath, imagePath };
        $window.localStorage["userDetails"] = JSON.stringify(userDetails);
        $state.go('chat', {}, { reload: true });
    }

    $scope.goToChatbot = function () {
        //var userDetails = { userId: userId, name: name, imagePath, imagePath };
        //$window.localStorage["userDetails"] = JSON.stringify(userDetails);
        $state.go('chatbot', {}, { reload: true });
    }
   
});