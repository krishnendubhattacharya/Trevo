app.controller('ModalCtrl', function ($scope, $stateParams, ionicMaterialInk, $ionicPopup, $timeout, authService, $state, $window, $rootScope, $http, momentService) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    // Toggle Code Wrapper
    var code = document.getElementsByClassName('code-wrapper');
    for (var i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }
    
    $scope.nativeLanguage = "EN";
    $scope.changeLanguage = "FR";
    $scope.init = function ()
    {
        if ($window.localStorage["translateInfo"] != undefined) {
            var userDetails = JSON.parse($window.localStorage["userInfo"]);
            var item = { User_Id: userDetails.userId, IsTranslate: 1 };
            momentService.insertTransliterationDetails(item).then(function (data) {
                var translateInfo = JSON.parse($window.localStorage["translateInfo"]);
                var sourceEn = translateInfo.sourceEn;
                var targetEn = translateInfo.targetEn;
                var text = translateInfo.text;
                $scope.toTranslateText = text;
                // $scope.message = "dhfgshjdf";
                var urlToHit = 'https://translation.googleapis.com/language/translate/v2?key=' + $rootScope.googleTranslateApiKey + '&source=' + sourceEn + '&target=' + targetEn + '&q=' + text;
                $http({
                    url: urlToHit,
                }).then(function (data) {

                    console.log(data.data.data.translations[0].translatedText);
                    $scope.message = data.data.data.translations[0].translatedText;
                    $window.localStorage["translateInfo"] = undefined;

                }, function (error) {
                    console.log(error.data.error.message);
                });
            }, function (error) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: error.Message
                });
            });
        }
    }

    $scope.init();
    


    $scope.goToChat = function ()
    {
        $state.go('chat');
    }

    $scope.SendChat = function (message)
    {
        $window.localStorage["messageToSend"] = message;
        $state.go('chat', {}, { reload: true });
    }

    $scope.changeTranslation = function (changeLanguage)
    {
        if ($window.localStorage["userInfo"])
        {
            var userDetails = JSON.parse($window.localStorage["userInfo"]);
            var item = { User_Id: userDetails.userId, IsTranslate: 1 };
            momentService.insertTransliterationDetails(item).then(function (data) {
                console.log(changeLanguage);
                console.log($scope.toTranslateText);
                var sourceEn = "EN";
                var target = changeLanguage;
                var text = $scope.toTranslateText;
                //$scope.message = "dhfgshjdf";
                var urlToHit = 'https://translation.googleapis.com/language/translate/v2?key=' + $rootScope.googleTranslateApiKey + '&source=' + sourceEn + '&target=' + target + '&q=' + text;
                $http({
                    url: urlToHit,
                }).then(function (data) {

                    console.log(data.data.data.translations[0].translatedText);
                    $scope.message = data.data.data.translations[0].translatedText;
                    $window.localStorage["translateInfo"] = undefined;

                }, function (error) {
                    console.log(error.data.error.message);
                });
            }, function (error) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: error.Message
                });
            });
        }
       
    }


   
});