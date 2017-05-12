angular.module('BigJApp').controller('PricelistController', function($scope, Storage, Service, User, toaster, $filter, $state, Pricelist, SP, BP, branchId, Product, $stateParams) {
    if($state.current.name == "pricelist-transactions") {
        $scope.transactions = Pricelist.transaction.query();
        $scope.delete = function(transaction) {
            Pricelist.transaction.delete({pricelistTransaction: transaction}, function() {
                toaster.pop({title: "Deleted!", body:"Deleted successfully!"});
                $scope.transactions = Pricelist.transaction.query();
                console.log("transaction deleted");
            } , function() {
                toaster.error({title: "Error!", body:"There's an error in deleting this transaction!"});
            });
        };
    }
    else {
        // console.log($state.current.name);
        // $scope.accessibleBranches = User.GetAccessibleBranches.query();
        $scope.accessAllowed = function () {
            var i;
            for (i = 0; i < $scope.accessibleBranches.length; i++) {
                if (branchId.value == $scope.accessibleBranches[i].id) {
                    return true;
                }
            }
            return false;
        };
        $scope.print = function() {
            window.print();
        };


        // $scope.productss = BP.get({bp: branchId.value});
        var userID = $stateParams.id;
        // console.log($scope.productss);
        //TRANSACTION
        $scope.products = [];
        $scope.one = Pricelist.transaction.get({pricelistTransaction: userID}, function() {
            branchId.value = $scope.one.branch.id;
            $scope.productss = BP.get({bp: branchId.value});
            $scope.products = Pricelist.transactionProduct.get({tp: userID}, function() {
                // $scope.getTotal = function(){
                //     var total = 0;
                //     for(var i = 0; i < $scope.products.length; i++){
                //         var product = $scope.products[i];
                //         total += (product.price * product.quantity);
                //     }
                //     return total;
                // }
            });

             $scope.selectedItemChanged = function (product) {
                $scope.item = Storage.get({storage: product}, function() {
                    $scope.itemInstance = $scope.item;
                });
            };

            $scope.users = [];
            $scope.items = Service.getItems($scope);
            console.log($scope.items);

            $scope.checkbox = function() {
                Service.setItems($scope.users, $scope);
                $scope.items = Service.getItems($scope);
            };

            //X EDITABLE
            // $scope.productss = Product.query();

            $scope.groups = [];
            $scope.loadGroups = function() {
                return $scope.groups.length ? null : Product.query(function(data) {
                    $scope.groups = data;
                });
            };

            $scope.showGroup = function(user) {
                // console.log($scope.groups);
                //$scope.groups = product
                //user = pricelist products
                if(user.product.name && $scope.groups.length) {
                    var selected = $filter('filter')($scope.groups, {id: user.product.id});
                    console.log("selected: " + selected);
                    return selected.length ? selected[0].name : 'Not set';
                } else {
                    console.log("hi");
                    return user.product.name || 'Not set';
                }
            };

            $scope.saveUser = function(data, id) {
                Pricelist.product.update({pricelistProduct: id}, data, function() {
                    toaster.success({title: "Success", body:"Product saved successfully!"});
                    console.log("SUCCESS!!");
                } , function() {
                    toaster.error({title: "Error", body:"Cannot save product. Please check input fields."});
                });
            };

            $scope.getTotal = function(){
                var total = 0;
                for(var i = 0; i < $scope.items.length; i++){
                    var product = $scope.items[i];
                    total += product.quantity * product.price 
                }
                return total;
            }
            // remove user
            $scope.removeUser = function(index, product) {
                Pricelist.product.delete({pricelistProduct: product.id}, function() {
                    toaster.pop({title: "Success", body:"Product removed successfully!"});
                } , function() {
                    toaster.error({title: "Error", body:"Cannot remove product."});
                });
                $scope.products.splice(index, 1);
            };

            // add user
            $scope.addUser = function() {
                // console.log($scope.transaction.id);
                var pricelistProduct = new Pricelist.product();
                pricelistProduct.product = $scope.itemInstance.product.id;
                pricelistProduct.quantity = $scope.quantity;
                pricelistProduct.price = $scope.price;
                if($scope.itemInstance != undefined) {
                    pricelistProduct.stockNumber = $scope.itemInstance.stockNumber;
                    pricelistProduct.unit = $scope.itemInstance.unit;
                }
                pricelistProduct.transaction = $scope.one.id;
                $scope.wp = Pricelist.product.save(pricelistProduct, function() {
                    $scope.pID = $scope.wp.id;
                    if($scope.itemInstance != undefined) {
                        $scope.inserted = {
                        id: $scope.pID,
                        product: {
                            name: $scope.itemInstance.product.name,
                            price: $scope.itemInstance.product.price,
                            photo_extension: $scope.itemInstance.product.photo_extension,
                            id: $scope.itemInstance.product.id
                        },
                        quantity: $scope.quantity,
                        stockNumber: $scope.itemInstance.stockNumber,
                        // unitPrice: $scope.itemInstance.product.price,
                        price: $scope.price
                        };
                        $scope.products.push($scope.inserted);
                    }
                    toaster.success({title: "Success", body:"Product added successfully!"});
                    // console.log($scope.products);
                } , function() {
                    toaster.error({title: "Error", body:"Please check you input fields."});
                });
            };
        });
    }
});
