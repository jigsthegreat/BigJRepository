angular.module('BigJApp').controller('SupplierController', function ($scope, toaster, $state, $stateParams, Supplier) {
    $scope.suppliers = Supplier.query();
    var selectedId = $stateParams.id;
    $scope.displayedCollection = [].concat($scope.suppliers);

    $scope.add = function () {
        var supplier = new Supplier();
        supplier.name = $scope.supplierName;
        supplier.contactNumber = $scope.supplierContactNumber;
        supplier.address = $scope.supplierAddress;
        Supplier.save(supplier, function () {
            toaster.success({title: "Success", body:"Supplier added successfully!"});
            setTimeout(function () {
                  $state.go('suppliers');
              }, 1000);
        } , function() {
            toaster.error({title: "Error", body:"Cannot add supplier. Please check input fields."});
        });
    };

    $scope.clickUpdate = function(row) {
        $scope.edit = row;
        console.log($scope.edit);
      }

    $scope.update = function (id) {
        var data = {name: $scope.edit.name, contactNumber: $scope.edit.contactNumber, address: $scope.edit.address};
        // supplier.name = $scope.supplierName;
        // supplier.contactNumber = $scope.supplierContactNumber;
        // supplier.address = $scope.supplierAddress;
        Supplier.update({supplier: id}, data, function () {
            toaster.success({title: "Success", body:"Supplier updated successfully!"});
        } , function() {
            toaster.error({title: "Error", body:"Cannot update supplier. Please check input fields."});
            $scope.suppliers = Supplier.query();
        });
    };

    $scope.delete = function(row) {
      var index = $scope.suppliers.indexOf(row);
      Supplier.delete({supplier: row.id}, function() {
        if (index !== -1) {
              $scope.suppliers.splice(index, 1);
          }
        toaster.pop({title: "Success", body:"Supplier removed successfully!"});
      } , function() {
        toaster.error({title: "Error", body:"Error in removing product."});
      });
    };
});
