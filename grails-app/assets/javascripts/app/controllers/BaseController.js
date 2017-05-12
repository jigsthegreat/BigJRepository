angular.module('BigJApp').controller('BaseController', function ($scope, $auth, $state, branchId, User, $rootScope) {

    if ($auth.isAuthenticated()) {
        $scope.loginUser = User.UserLoggedIn.get(function () {
            $scope.requestedRole = $scope.loginUser.requested_role;
            //console.log($scope.loginUser.requested_role);
        });

        $scope.accessibleBranches = User.GetAccessibleBranches.query(function () {
            $scope.hehe = $scope.accessibleBranches;
            if ($scope.accessibleBranches.length == 1) {
                var val = $scope.hehe[0].id - 1;
                if(branchId.value == null) {
                    branchId.value = val + 1;
                    console.log('put hahaha');
                }
                $scope.selectedOption = $scope.options[val];
                $scope.branch = branchId.value;
                console.log("$scope.branch: " + $scope.branch);
            }
        });
    }
    $scope.accessAllowed = function () {
        // console.log("hey: " + $scope.hehe[0].id);
        // console.log("branch value:" + branchId.value);
        var i;
        for (i = 0; i < $scope.accessibleBranches.length; i++) {
            if (branchId.value == $scope.accessibleBranches[i].id) {
                return true;
            }
        }
        return false;
    };

    $scope.changeBranchId = function (newId) {
        branchId.value = newId;
        $scope.branch = newId;
    };
    $scope.options = [{name: "ALDEGUER", id: 1}, {name: "HOSKYN", id: 2}, {name: "TANZA", id: 3}];


    $scope.logout = function () {
        $auth.logout();
        $state.go('signin');
    };

    $scope.isAuthenticated = function () {
        return $auth.isAuthenticated();
    };


    $scope.isUser = function () {
        if ($scope.requestedRole != null) {
            return false;
        } else {
            return true;
        }
    }
    // console.log($state);
    // if($state.current.name == "pricelist-transaction") {
    //     console.log('ari ko d');
    //     $scope.disableSelect = true;
    // } else {
    //     $scope.disableSelect = false;
    // }
    // $scope.wat = true;

    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            // event.preventDefault();
            // console.log(toState.name);
            if (toState.name == "pricelist-transaction" || toState.name == "purchase-order-transaction"
                || toState.name == "add-purchase-order-transaction" || toState.name == "add-pricelist-transaction") {
                $scope.hehehe = true;
            } else {
                $scope.hehehe = false;
            }
        });
});
