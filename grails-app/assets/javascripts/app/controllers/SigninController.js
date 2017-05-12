angular.module('BigJApp').controller('SigninController', function ($scope, $auth, $state, $window) {
    $scope.login = function () {
        var user = {
            username: $scope.username,
            password: $scope.password
        };

        $auth.login(user)
            .then(function (response) {
                    console.log('hihihi');
                // $state.go('products', {});
                setTimeout(function () {
                    $window.location.reload();
                }, 2000);
            });
    };
});