angular.module('BigJApp').controller('PurchaseOrderTransactionController', function($scope, User, toaster, $state, PurchaseOrder, Supplier, Product, Storage, SP, branchId, BP, Branch) {
    $scope.suppliers = Supplier.query();
    $scope.branches = Branch.query();
    $scope.created = false;

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
        var orderedTransaction = new PurchaseOrder.transaction();
        if($scope.selectedOption2 != undefined) {
            orderedTransaction.supplier = $scope.selectedOption2.id;
        }
        if($scope.selectedOption1 != undefined) {
            orderedTransaction.branch = $scope.selectedOption1.id;
            branchId.value = $scope.selectedOption1.id;
            // $scope.prods = BP.get({bp: branchId.value});
        } else {
            orderedTransaction.branch = branchId.value;
        }
        $scope.prods = BP.get({bp: branchId.value});

        if($scope.data != undefined) {
            orderedTransaction.dateOrdered = $scope.data.dateDropDownInput;
            orderedTransaction.dateToReceive = $scope.data.dateReceived;
        }


        orderedTransaction.shipVia = $scope.shipVia;
        $scope.tran = PurchaseOrder.transaction.save(orderedTransaction, function() {
            toaster.success({title: "Success", body:"Transaction added successfully!"});
            // toaster.pop('note', "title", "text");
            $scope.created = true;
            $scope.transaction = $scope.tran;
        }, function() {
            toaster.error({title: "Error", body:"Error in adding transaction. Please check input fields."});
        }
        );
    };

    $scope.hasPick = false;

    $scope.onChange = function(status) {
        console.log(status);
        $scope.hasPick = true;
    };

    //date
    // $scope.dateOrdered = new Date();
    // $scope.dateOpen = {};
    // $scope.open = function($event){
    //     $event.preventDefault();
    //     $event.stopPropagation();
    //     $scope.dateOpen.opened = true;
    // }

    // $scope.format = 'MMMM-dd-yyyy';

    // $scope.dateOptions = {
    //     formatYear: 'yy',
    //     startingDay: 1
    // };

    //  var that = this;

    // this.dates = {
    //     date3: null,
    //     date4: null
    // };

    // this.open = {
    //     date3: false,
    //     date4: false
    // };

    // // Disable today selection
    // // this.disabled = function(date, mode) {
    // //     return (mode === 'day' && (new Date().toDateString() == date.toDateString()));
    // // };

    // this.dateOptions = {
    //     showWeeks: false,
    //     startingDay: 1
    // };

    // this.timeOptions = {
    //     readonlyInput: false,
    //     showMeridian: false
    // };

    // this.dateModeOptions = {
    //     minMode: 'year',
    //     maxMode: 'year'
    // };

    // this.openCalendar = function(e, date) {
    //     that.open[date] = true;
    // };

    //X EDITABLE
    // $scope.productss = Product.query();
    $scope.discount = 0;
    $scope.products = [];
    $scope.getTotal = function(){
        var total = 0;
        for(var i = 0; i < $scope.products.length; i++){
            var product = $scope.products[i];
            total += ((product.unitPrice * 1) - product.unitPrice * (product.discount / 100)) * product.quantity;
        }
        return total;
    }

    $scope.selectedItemChanged = function (product) {
        $scope.item = SP.get({storage: product}, function () {
            $scope.itemInstance = $scope.item;
            // console.log($scope.itemInstance);
        });
    }

    $scope.saveUser = function(data, id) {
        PurchaseOrder.product.update({orderedProduct: id}, data, function() {
            toaster.success({title: "Success", body:"Product saved successfully!"});
            // console.log("SUCCESS!!");
        } , function() {
            toaster.error({title: "Error", body:"There was an error saving the product."});
        });
        // console.log(data);
    };

    // remove user
    $scope.removeUser = function(index, product) {
        //delete purchase_order_product
        PurchaseOrder.product.delete({orderedProduct: product.id}, function() {
            toaster.pop({title: "Success", body:"Product removed successfully!"});
        } , function() {
            toaster.error({title: "Error", body:"There was an error removing the product"});
        });
        //delete NEW product in storage,, put validation
        if(product.newProduct == 1) {
            // console.log("new product");
            $scope.storage = SP.get({storage: product.newId}, function() {
                Storage.delete({storage: $scope.storage.id}, function() {
                });
            });
        }
        $scope.products.splice(index, 1);
    };

    $scope.clearmodal = function() {
      $scope.productName = "";
      $scope.productColor = "";
      $scope.productSize = "";
      $scope.description = "";
      $scope.productPrice = "";
      $scope.stockNumber = "";
      $scope.quantity = "";
      $scope.unit = "";
      $scope.discount = 0;
      $scope.unitPrice = "";
      $scope.notes = "";
    }

    // add user

    $scope.addUser = function() {
        if($scope.selected == 'new'){
            var product = new Product();
            product.name = $scope.productName;
            product.color = $scope.productColor;
            product.size = $scope.productSize;
            product.description = $scope.description;
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
                ordered_product.description = $scope.description;
                ordered_product.transaction = $scope.transaction.id;
                ordered_product.newProduct = 1;
                $scope.op = PurchaseOrder.product.save(ordered_product, function() {
                    var storage = new Storage();
                    storage.product = $scope.newProduct.id;
                    storage.stockNumber = $scope.stockNumber;
                    //
                    storage.unit = $scope.unit;
                    storage.supplier = $scope.selectedOption2.id;
   ///need branch id
                    storage.branch = branchId.value;
                    $scope.store = Storage.save(storage, function() {
                        // console.log($scope.store);
                    });
                    $scope.pID = $scope.op.id;
                    $scope.inserted = {
                        id: $scope.pID,
                        newId: $scope.newProduct.id,
                        product: $scope.newProduct.name,
                        quantity: $scope.quantity,
                        unit: $scope.unit,
                        discount: $scope.discount,
                        stockNumber: $scope.stockNumber,
                        color: $scope.productColor,
                        description: $scope.description,
                        unitPrice: $scope.unitPrice,
                        notes: $scope.notes,
                        newProduct: 1,
                        // photo_extension: $scope.itemInstance.product.photo_extension,
                        // productId: $scope.itemInstance.product.id
                    };
                    toaster.success({title: "Success", body:"Product added successfully!"});
                    $scope.products.push($scope.inserted);
                      $scope.clearmodal();
                } , function() {
                    toaster.error({title: "Error", body:"Cannot add product. Please check input fields."});
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
            ordered_product.transaction = $scope.transaction.id;
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
                    product: $scope.itemInstance.product.name,
                    quantity: $scope.quantity,
                    unit: $scope.itemInstance.unit,
                    discount: $scope.discount,
                    stockNumber: $scope.itemInstance.stockNumber,
                    color: $scope.itemInstance.product.color,
                    description: $scope.description,
                    unitPrice: $scope.unitPrice,
                    notes: $scope.notes,
                    newProduct: 0,
                    photo_extension: $scope.itemInstance.product.photo_extension,
                    productId: $scope.itemInstance.product.id
                };
                $scope.products.push($scope.inserted);
                toaster.success({title: "Success", body:"Product added successfully!"});
                $scope.clearmodal();
            } , function() {
                toaster.error({title: "Error", body:"Cannot add product. Please check input fields."});
            });
        }
    };
});
