angular.module('BigJApp').controller('UserController', function ($scope, $window, toaster, $auth, $state, $stateParams, toaster, User, Branch) {
    var selectedId = $stateParams.id;

    $scope.login = function () {
        var USER = {
            username: $scope.username,
            password: $scope.password
        };
        $auth.login(USER).then(function (response) {
            if ($scope.userForm.$valid) {
                $state.go('home');
                    setTimeout(function () {
                    $window.location.reload();
                }, 1);
                toaster.success({title: "SUCCESSFULLY", body:"Logged In."});
            }
        }).catch(function(){
            toaster.error({title: "FAILED LOG IN", body:"Incorrect Username/Password"})
        });
    };

    $scope.branches = Branch.query();

    $scope.create = function () {
        var user = new User.User();
        user.firstName = $scope.formInfo.firstName;
        user.lastName = $scope.formInfo.lastName;
        user.username = $scope.formInfo.username;
        user.password = $scope.formInfo.password;
        user.contactNumber = $scope.formInfo.contactNumber;
        user.gender = $scope.formInfo.gender;
        user.enabled = false;
        var date =  $scope.formInfo.year + "-" + $scope.formInfo.month + "-" + $scope.formInfo.day;
        var m = moment(date);
        user.birthDate = m;
        user.requested_role = parseFloat($scope.formInfo.branch) + 2;
        User.User.save(user, function() {
            toaster.success({title: "SUCCESSFULLY", body:"Created!."});
            setTimeout(function () {
                $state.go('signup-success',{});
            }, 1500);
        } , function() {
            toaster.error({title: "ERROR", body:"Username is already taken."});
        });
    };

    $scope.update = function () {
        var user = User.User.get({user: selectedId});
        user.username = $scope.formInfo.username;
        user.password = $scope.formInfo.password;
        user.requested_role = parseFloat($scope.formInfo.branch) + 2;
        User.User.update({user: selectedId}, user, function () {
            $state.go('home');
        });
    };

    $scope.months = [
        {name: 'January', value: '01'},
        {name: 'February', value: '02'},
        {name: 'March' , value: '03'},
        {name: 'April' , value: '04'},
        {name: 'May' , value: '05'},
        {name: 'June' , value: '06'},
        {name: 'July' , value: '07'},
        {name: 'August' , value: '08'},
        {name: 'September' , value: '09'},
        {name: 'October' , value: '10'},
        {name: 'November' , value: '11'},
        {name: 'December' , value: '12'}
    ];

    $scope.selectedChanged = function(month) {
        if(month == '01' || month == '03' || month == '05' || month == '07' || month == '08' || month == '10' || month == '12') {
            $scope.maxDay = 31;
            $scope.month = month;
        }
        if(month == '04' || month == '06' || month == '09' || month == '11') {
            $scope.maxDay = 30;
            $scope.month = month;
        }
        if(month == '02') {
            $scope.month = 2;
        }
        console.log($scope.maxDay);
    }

    $scope.checkDate = function() {
        if($scope.maxDay != undefined && $scope.formInfo.day > $scope.maxDay) {
            //invalid date
            console.log('day input is bigger than maxday');
        }

        if($scope.month != undefined && $scope.formInfo.day != undefined && $scope.formInfo.year != undefined) {
            if($scope.month == 2 && new Date($scope.formInfo.year, 1, 29).getMonth() == 1) {
                $scope.maxDay = 29;
            }
            if($scope.month == 2 && new Date($scope.formInfo.year, 1, 29).getMonth() != 1) {
                $scope.maxDay = 28;
            }
        }
    }

});
