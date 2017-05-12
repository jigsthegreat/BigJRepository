angular.module('BigJApp').controller('HomeController', function ($scope, toaster, $state, User, Branch, Notification, PurchaseOrder) {
    $scope.nonUsers = User.GetNonUsers.query();

    $scope.isUser = function() {
        $scope.loginUser = User.UserLoggedIn.get(function() {
            $scope.requestedRole = $scope.loginUser.requested_role;
        });
        console.log('hi');
        if($scope.requestedRole != null) {
            return false;
        } else {
            return true;
        }
    };

    $scope.notifications = Notification.query(function() {
        // console.log($scope.notifications);
    });
    
    $scope.users = User.User.query();

    $scope.changeStatus = function (user) {
        User.ChangeStatus.get({id: user});
        setTimeout(function () {
            $scope.nonUsers = User.GetNonUsers.query();
            $state.reload();
        }, 1000);
    };

    $scope.accessibleBranches = User.GetAccessibleBranches.query();
    $scope.currentUser = User.UserLoggedIn.get();

    $scope.isAdmin = function () {
        if ($scope.accessibleBranches.length == 3) {
            return true;
        }
        return false;
    };

    $scope.deleteUser = function (user) {
        User.User.delete({user: user.id}, function () {
            // setTimeout(function () {
                toaster.pop({title: "Remove", body:"Removed Successfully!"});
                $scope.users = User.User.query();
                $scope.nonUsers = User.GetNonUsers.query();
            // }, 1000);
        });
    };

    $scope.clickModal = function(user) {
        $scope.branches = Branch.query();
        $scope.editUser = user;
        console.log($scope.editUser.requested_role);
    }

    $scope.saveUpdate = function() {
        console.log($scope.editUser.requested_role);
        $scope.data = {firstName: $scope.editUser.firstName, lastName: $scope.lastName, 
            username: $scope.editUser.username, 
            // requested_role: $scope.editUser.requested_role.id
        };
        // user.requested_role = parseFloat($scope.formInfo.branch) + 2;
        User.User.update({user: $scope.editUser.id}, $scope.data, function() {
            console.log("user edit success");
        } , function() {
            console.log("user edit error");
        });
    }

    //$scope.updateUser = function () {
    //    var user = Category.get({category: categoryId});
    //    category.name = $scope.category.name;
    //    Category.update({category: categoryId}, category, function () {
    //        $state.go('categories');
    //    });
    //};

    $scope.transactionss = PurchaseOrder.transaction.query(function() {
        $scope.transactions = $scope.transactionss.sort().reverse();
    });

    $scope.formatDate = function(date) {
            var m;
            if(date == null) {
                m = "Date not set";
            } else {
                m = moment(date).fromNow();
            }
            return m;
        };
});
