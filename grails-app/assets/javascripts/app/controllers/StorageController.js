angular.module('BigJApp').controller('StorageController', function ($scope, Notification, toaster, $state, Storage, Product, User, Client, branchId) {

    $scope.rowCollection = Storage.query();
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.accessibleBranches = User.GetAccessibleBranches.query(function () {
        $scope.hehe = $scope.accessibleBranches;
        console.log();
        if ($scope.accessibleBranches.length == 1) {
            // branchId.value = $scope.hehe[0].id;
            // console.log("bID:" + branchId.value);
            // $scope.branch = branchId.value;
            // branchId.value = null;
        }
        else {
            branchId.value = 1;
        }
    });
    

    $scope.comingIn = function () {
        var newQuantity = (parseInt($scope.addedQuantity) + parseInt($scope.row.quantity));
        var data = {quantity: newQuantity};
        Storage.update({storage: $scope.row.id}, data, function () {
            var message = "added " + $scope.addedQuantity + "(" + $scope.row.unit + ") of " + $scope.row.product.name + " in " + $scope.row.branch.name + " Inventory";
            var notif = new Notification();
            notif.user = $scope.loginUser.id;
            notif.content = message;
            if ($scope.accessibleBranches.length == 1) {
                notif.branch = $scope.hehe[0].id;
            }
            Notification.save(notif, function () {
                console.log('notif added');
            });
            toaster.success({title: "Success", body: "Storage updated successfully!"});
            $('#myModalComingIn .close').click();
            setTimeout(function () {
                $scope.rowCollection = Storage.query();
            }, 1000);
        }, function () {
            toaster.error({title: "Error", body: "Cannot update storage. Please check input fields."});
        });
    };

    $scope.comingOut = function (row) {
        if (parseInt($scope.row.quantity) < parseInt($scope.minusQuantity)) {
            return
        }
        ;
        var newQuantity = (parseInt($scope.row.quantity) - parseInt($scope.minusQuantity));
        // if(newQuantity < 0) {
        //     // return;
        //     toaster.error({title: "Error", body: "Cannot deduct this quantity."});
        // }
        var data = {quantity: newQuantity};
        Storage.update({storage: $scope.row.id}, data, function () {
            var message = "deducted " + $scope.minusQuantity + "(" + $scope.row.unit + ") of " + $scope.row.product.name + " in " + $scope.row.branch.name + " Inventory";
            var notif = new Notification();
            notif.user = $scope.loginUser.id;
            notif.content = message;
            if ($scope.accessibleBranches.length == 1) {
                notif.branch = $scope.hehe[0].id;
            }
            Notification.save(notif, function () {
                console.log('notif added');
            });
            toaster.success({title: "Success", body: "Storage updated successfully!"});
            $('#myModalComingOut .close').click();
            setTimeout(function () {
                $scope.rowCollection = Storage.query();
            }, 1000);
        }, function () {
            toaster.error({title: "Error", body: "Cannot update storage. Please check input fields."});
        });
    };

    $scope.showModal = function (row) {
        $scope.row = row;
        $scope.currentQuantity = row.quantity;
    };
});
