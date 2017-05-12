angular.module('BigJApp').controller('PricelistTransactionController', function($scope, User, toaster, $state, Branch, BP, branchId, Pricelist, Client, Product, Storage, SP) {
  $scope.clients = Client.query();
  $scope.branches = Branch.query();
  $scope.submitted = false;
  
  $scope.accessibleBranches = User.GetAccessibleBranches.query(function() {
      $scope.hehe = $scope.accessibleBranches;
      if($scope.accessibleBranches.length == 1) {
          branchId.value = $scope.hehe[0].id;
      }
      else {
          branchId.value = null;
          $scope.all = true;
      }
      
  });
    
    $scope.accessAllowed = function () {
        var i;
        for (i = 0; i < $scope.accessibleBranches.length; i++) {
            if (branchId.value == $scope.accessibleBranches[i].id) {
                return true;
            }
        }
        return false;
    };

  $scope.add = function() {
    var pricelistTransaction = new Pricelist.transaction();
    if ($scope.selectedOption2 != undefined) {
      pricelistTransaction.client = $scope.selectedOption2.id;
    }
    console.log($scope.selectedOption1);
    if($scope.selectedOption1 != undefined) {
        pricelistTransaction.branch = $scope.selectedOption1.id;
        branchId.value = $scope.selectedOption1.id;
        // console.log('$scope.selectedOption1');
    } else {
        pricelistTransaction.branch = branchId.value;
    }
    
    $scope.productss = BP.get({bp: branchId.value});
    // pricelistTransaction.status = $scope.status;
    $scope.tran = Pricelist.transaction.save(pricelistTransaction, function() {
      $scope.transaction = $scope.tran;
      $scope.submitted = true;
      toaster.success({
        title: "Success",
        body: "Pricelist added successfully!"
      });
    }, function() {
      toaster.error({
        title: "Error",
        body: "Cannot update pricelist. Please check input fields."
      });
    });
  };

  //X EDITABLE
  // $scope.productss = Product.query();
  
  $scope.products = [];

  // $scope.selectedItemChanged = function(product) {
  //   $scope.item = SP.get({
  //     storage: product
  //   }, function() {
  //     $scope.itemInstance = $scope.item;
  //   });
  // }
  $scope.selectedItemChanged = function (product) {
        $scope.item = Storage.get({storage: product}, function() {
            $scope.itemInstance = $scope.item;
        });
    };

  $scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : Product.query(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function(user) {
    if (user.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {
        id: user.group
      });
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.product || 'Not set';
    }
  };

  $scope.showUnitPrice = function() {

  };

  $scope.saveUser = function(data, id) {
    Pricelist.product.update({
      pricelistProduct: id
    }, data, function() {
      toaster.success({
        title: "Success",
        body: "Product saved successfully!"
      });
      console.log(data);
    }, function() {
      toaster.error({
        title: "Error",
        body: "Cannot save product. Please check input fields."
      });
    });
  };

  $scope.clearmodal = function() {
    $scope.price = "";
  }
    // remove user
  $scope.removeUser = function(index, product) {
    Pricelist.product.delete({
      pricelistProduct: product.id
    }, function() {
      toaster.success({
        title: "Success",
        body: "Product removed successfully!"
      });
    }, function() {
      toaster.error({
        title: "Error",
        body: "Cannot remove product."
      });
    });
    $scope.products.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
    // console.log($scope.itemInstance);
    var pricelistProduct = new Pricelist.product();
    pricelistProduct.product = $scope.product;
    pricelistProduct.quantity = $scope.quantity;
    pricelistProduct.price = $scope.price;
    pricelistProduct.stockNumber = $scope.itemInstance.stockNumber;
    pricelistProduct.unit = $scope.itemInstance.unit;
    pricelistProduct.transaction = $scope.transaction.id;
    $scope.wp = Pricelist.product.save(pricelistProduct, function() {
      $scope.pID = $scope.wp.id;
      $scope.inserted = {
        id: $scope.pID,
        // product: parseInt($scope.product),
        product: $scope.itemInstance.product.name,
        quantity: $scope.quantity,
        stockNumber: $scope.itemInstance.stockNumber,
        sellingPrice: $scope.itemInstance.product.sellingPrice,
        price: $scope.price,
        photo_extension: $scope.itemInstance.product.photo_extension,
        productId: $scope.itemInstance.product.id
      };
      $scope.products.push($scope.inserted);
      $scope.clearmodal();
      toaster.success({
        title: "Success",
        body: "Product added successfully!"
      });
    }, function() {
      toaster.error({
        title: "Error",
        body: "Please check your input fields."
      });
    });
  };
});
