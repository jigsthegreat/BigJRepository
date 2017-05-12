angular.module('BigJApp').controller('ClientController', function($scope, toaster, $state, $stateParams, Client) {
  $scope.clients = Client.query();
  var selectedId = $stateParams.id;
  $scope.displayedCollection = [].concat($scope.clients);

  $scope.add = function() {
    var client = new Client();
    client.name = $scope.clientName;
    client.contactNumber = $scope.clientContactNumber;
    client.address = $scope.clientAddress;
    Client.save(client, function() {
      toaster.success({title: "Success", body:"Client added successfully!"});
      setTimeout(function () {
          $state.go('clients', {});
      }, 1000);
      // $scope.clients = Client.query();
    } , function() {
      toaster.error({title: "Error", body:"Cannot add client. Please check input fields."});
    });
  };
  $scope.clickUpdate = function(row) {
    $scope.edit = row;
    console.log($scope.edit);
  }

  $scope.update = function(id) {
    var data = {name: $scope.edit.name, contactNumber: $scope.edit.contactNumber, address: $scope.edit.address};
    // client.name = $scope.edit.name;
    // client.contactNumber = $scope.edit.contactNumber;
    // client.address = $scope.edit.address;
    Client.update({client: id}, data, function() {
      // console.log("success edit");
      toaster.pop({title: "Success", body:"Client updated successfully!"});
    } , function() {
      toaster.error({title: "Error", body:"Cannot update client information. Please check input fields."});
      $scope.clients = Client.query();
    });
  };

  $scope.delete = function(row) {
    var index = $scope.clients.indexOf(row);
    Client.delete({client: row.id}, function() {
      toaster.success({title: "Success", body:"Client removed successfully!"});
      if (index !== -1) {
        $scope.clients.splice(index, 1);
      }
    } , function() {
      toaster.error({title: "Error", body:"Error in removing product."});
    });
  };
});
