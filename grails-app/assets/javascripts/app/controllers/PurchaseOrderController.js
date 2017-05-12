angular.module('BigJApp').controller('PurchaseOrderController', function($scope, User, toaster, $state, PurchaseOrder, Product, $stateParams, BP, SP, branchId, Storage) {
    if($state.current.name == "purchase-order-transactions") {
        $scope.transactions = PurchaseOrder.transaction.query();
        $scope.displayedCollection = [].concat($scope.transactions);
        branchId.value = null;

        $scope.delete = function(transaction) {
            PurchaseOrder.transaction.delete({orderedTransaction: transaction.id}, function() {
                toaster.pop({title: "Deleted!", body:"Successfully deleted."});
                $scope.transactions = PurchaseOrder.transaction.query();
                // console.log("transaction deleted");
            });
        };
    }
    else {
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
        $scope.print = function() {
            window.print();
        };
        
        //$scope.productss = Product.query();
        var userID = $stateParams.id;

        //date
        $scope.showDateBody = false;
        $scope.showDate = function() {
            if($scope.showDateBody == true) {
                $scope.showDateBody = false;
            }
            else {
                $scope.showDateBody = true;
            }
        };
        $scope.clickedStored = false;

        $scope.hasPick = false;

        $scope.onChange = function(status) {
            console.log(status);
            $scope.hasPick = true;
        };

        $scope.formatDate = function(date) {
            var m;
            if(date == null) {
                m = "Date not set";
            } else {
                m = moment(date).fromNow();
            }
            return m;
        };

        $scope.saveDateReceived = function(dateR) {
            var data = {dateReceived: dateR};
            PurchaseOrder.transaction.update({orderedTransaction: $scope.one.id}, data, function() {
                $state.reload();
                console.log('updated date received');
            });
        };
        $scope.showModal = function(product) {
            $scope.purchaseOrderProductId = product.id;
            $scope.productToStore = SP.get({storage: product.product.id}, function() {
                $scope.productToStore1 = $scope.productToStore;
            });
        };

        $scope.addToStorage = function(quantity, id, productID) {
            // product in storage
                $scope.product = SP.get({storage: id}, function() {
                    var newQuantity = (parseInt($scope.product.quantity) + parseInt(quantity));
                    var newData = {quantity: newQuantity};
                    Storage.update({storage: $scope.product.id}, newData, function() {
                        var stored = {stored: 1};
                        PurchaseOrder.product.update({orderedProduct: productID}, stored, function() {
                            console.log("changed to stored 1");
                            // $scope.clickedStored = true;
                        });
                        toaster.success({title: "Success!", body:"Added to storage."});
                        // console.log("updated")
                        $state.reload();
                    });
                });
        };

        //TRANSACTION
        $scope.products = [];
        $scope.discount = 0;
        $scope.one = PurchaseOrder.transaction.get({orderedTransaction: userID}, function() {
            branchId.value = $scope.one.branch.id;
            $scope.prods = BP.get({bp: branchId.value});
            $scope.products = PurchaseOrder.transactionProduct.get({tp: userID}, function() {
                $scope.getTotal = function(){
                    var total = 0;
                    for(var i = 0; i < $scope.products.length; i++){
                        var product = $scope.products[i];
                        total += ((product.unitPrice * 1) - product.unitPrice * (product.discount / 100)) * product.quantity;
                    }
                    return total;
                }
            });

            $scope.selectedItemChanged = function (product) {
                $scope.item = SP.get({storage: product}, function () {
                    $scope.itemInstance = $scope.item;
                    // console.log($scope.itemInstance);
                });
            }

            //X EDITABLE
            $scope.getTotal = function(){
                var total = 0;
                for(var i = 0; i < $scope.products.length; i++){
                    var product = $scope.products[i];
                    total += ((product.unitPrice * 1) - product.unitPrice * (product.discount / 100)) * product.quantity;
                }
                return total;
            }

            $scope.saveUser = function(data, id) {
                PurchaseOrder.product.update({orderedProduct: id}, data, function() {
                    toaster.success({title: "Success", body:"Updated Successfully!"});
                    // console.log("SUCCESS!!");
                });
            };

            // remove user
            $scope.removeUser = function(index, product) {
                PurchaseOrder.product.delete({orderedProduct: product.id}, function() {
                    toaster.pop('note', "Remove", "Product removed successfully!");
                });
                if(product.newProduct == 1) {
                    $scope.storage = SP.get({storage: product.newId}, function() {
                        console.log($scope.storage);
                        toaster.pop('note', "Remove", "Product removed successfully!");

                        Storage.delete({storage: $scope.storage.id}, function() {
                            console.log("DELETED");
                        });
                    });
                }
                $scope.products.splice(index, 1);
            };

            // add user
            $scope.addUser = function() {
                if($scope.selected == 'new'){
                    var product = new Product();
                    product.name = $scope.productName;
                    product.color = $scope.productColor;
                    product.size = $scope.productSize;
                    product.description = $scope.productDescription;
                    product.price = $scope.productPrice;
                    $scope.newProduct = Product.save(product, function() {
                        var ordered_product = new PurchaseOrder.product();
                        ordered_product.product = $scope.newProduct.id;
                        ordered_product.quantity = $scope.quantity;
                        ordered_product.unit = $scope.unit;
                        if($scope.discount == ""){
                                $scope.discount = 0;
                        }
                        ordered_product.discount = $scope.discount;
                        ordered_product.unitPrice = $scope.unitPrice;
                        ordered_product.notes = $scope.notes;
                        ordered_product.stockNumber = $scope.stockNumber;
                        ordered_product.transaction = $scope.one.id;
                        ordered_product.newProduct = 1;
                        $scope.op = PurchaseOrder.product.save(ordered_product, function() {
                            var storage = new Storage();
                            storage.product = $scope.newProduct.id;
                            storage.stockNumber = $scope.stockNumber;
                            storage.quantity = 0;
                            storage.unit = $scope.unit;
                            // storage.quantity = $scope.quantity;
                            storage.supplier = $scope.one.supplier;
           ///need branch id
                            storage.branch = branchId.value;
                            $scope.store = Storage.save(storage, function() {
                                // console.log($scope.store);
                            });
                            $scope.pID = $scope.op.id;
                            $scope.inserted = {
                                id: $scope.pID,
                                newId: $scope.newProduct.id,
                                product: {
                                    name: $scope.newProduct.name,
                                    color: $scope.newProduct.color,
                                    // photo_extension: $scope.itemInstance.product.photo_extension,
                                    // id: $scope.itemInstance.product.id
                                },
                                quantity: $scope.quantity,
                                unit: $scope.unit,
                                discount: $scope.discount,
                                stockNumber: $scope.stockNumber,
                                // color: $scope.productColor,
                                description: $scope.description,
                                unitPrice: $scope.unitPrice,
                                notes: $scope.notes,
                                newProduct: 1
                            };
                            toaster.success({title: "Success", body:"Product added successfully!"});
                            $scope.products.push($scope.inserted);
                        }, function() {
                            toaster.error({title: "Error", body:"Please check your input fields."});
                        });
                    });
                }
                else {
                    var ordered_product = new PurchaseOrder.product();
                    if($scope.itemInstance != undefined) {
                        ordered_product.product = $scope.itemInstance.product.id;
                        ordered_product.stockNumber = $scope.itemInstance.stockNumber;
                        ordered_product.unit = $scope.itemInstance.unit;
                    }

                    ordered_product.quantity = $scope.quantity;
                    if($scope.discount == ""){
                    $scope.discount = 0;
                    }
                    ordered_product.discount = $scope.discount;
                    ordered_product.unitPrice = $scope.unitPrice;
                    ordered_product.notes = $scope.notes;
                    ordered_product.description = $scope.description;
                    ordered_product.transaction = $scope.one.id;
                    $scope.op = PurchaseOrder.product.save(ordered_product, function() {

                        //product in storage
                        // var product = SP.get({storage: $scope.storageProduct}, function() {
                        //     var newQuantity = (parseInt(product.quantity) + parseInt($scope.quantity));
                        //     var newData = {quantity: newQuantity};
                        //     Storage.update({storage: product.id}, newData, function() {
                        //         console.log("updated")
                        //     });
                        // });
                        $scope.pID = $scope.op.id;
                        $scope.inserted = {
                            id: $scope.pID,
                            product: {
                                name: $scope.itemInstance.product.name,
                                color: $scope.itemInstance.product.color,
                                photo_extension: $scope.itemInstance.product.photo_extension,
                                id: $scope.itemInstance.product.id
                            },
                            quantity: $scope.quantity,
                            unit: $scope.itemInstance.unit,
                            discount: $scope.discount,
                            stockNumber: $scope.itemInstance.stockNumber,
                            // color: $scope.itemInstance.product.color,
                            description: $scope.description,
                            unitPrice: $scope.unitPrice,
                            notes: $scope.notes,
                            newProduct: 0
                        };
                        toaster.success({title: "Success", body:"Product added successfully!"});
                        $scope.products.push($scope.inserted);
                    } , function() {
                        toaster.error({title: "Error", body:"Please check your input fields."});
                    });
                }
            };
        });
    }
});
