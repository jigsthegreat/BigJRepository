angular.module('BigJApp').controller('ProductController', function ($scope, branchId, Notification, User, toaster, Product, Upload, SubCategory, $state, Category, Supplier, Branch, Storage) {

    $scope.categories = Category.query();
    $scope.subCategories = SubCategory.query();
    $scope.suppliers = Supplier.query();
    $scope.branches = Branch.query();
    $scope.selectedCategory = null;
    $scope.newCategory = null;

    $scope.accessibleBranches = User.GetAccessibleBranches.query(function() {
          $scope.hehe = $scope.accessibleBranches;
          if($scope.accessibleBranches.length == 1) {
              // branchId.value = $scope.hehe[0].id;
          }
          else {
              $scope.all = true;
          }

      });

    $scope.submit = function () {
        if ($scope.file) {
            $scope.upload($scope.file);
        }
    };
    // console.log($scope.sub);

    $scope.setCategory = function (category) {
        $scope.selectedCategory = category;
        console.log($scope.selectedCategory);
    };
    $scope.setSubcategory = function(id) {
        $scope.sub = id;
        console.log($scope.sub);
    };
    $scope.displayAll = function() {
        $scope.sub = undefined;
        console.log($scope.sub);
    }

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: '/BigJRepository/upload/',
            data: {file: file},
            file: file,
            fileFormDataName: "myFile"
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    $scope.editUpload = function (file, id) {
        Upload.upload({
            url: '/BigJRepository/editUpload/' + id,
            data: {file: file},
            file: file,
            fileFormDataName: "myFile"
        });
    };

    $scope.checkPicture = function (row) {
        // console.log(row.photo_extension);
        if (row.photo_extension == null) {
            $scope.location = "default.jpg";
        } else {
            $scope.location = row.id + "." + row.photo_extension;
        }
        return true;
        // console.log($scope.location);
    };
    $scope.disableButtonAdd = false;
    $scope.addSuccess = false;
    $scope.clicked = false;
    $scope.changeStatus = function() {
        $scope.clicked = true;
    };

    $scope.addToStorage = function() {
        console.log('submitted to storage');
        var storage = new Storage();
        storage.product = $scope.newProduct1.id;
        storage.unit = $scope.formInfo.unit;
        storage.quantity = $scope.formInfo.quantity;
        storage.stockNumber = $scope.formInfo.stockNumber;
        var branchName = "";
        if($scope.selectedOption2 != undefined) {
            // pricelistTransaction.branch = $scope.selectedOption1.id;
            // branchId.value = $scope.selectedOption2.id;
            storage.branch = $scope.selectedOption2.id;
            branchName = $scope.selectedOption2.name;
        }
        if($scope.selectedOption2 == undefined) {
            storage.branch = $scope.hehe[0].id;
            branchName = $scope.hehe[0].name;
        }
        // storage.branch = branchId.value;
        if($scope.selectedOption3 != undefined) {
            storage.supplier = $scope.selectedOption3.id;
        }
        Storage.save(storage, function() {

            var message = "added " + $scope.formInfo.quantity + "(" + $scope.formInfo.unit + ") of " + $scope.newProduct1.name + " in " + branchName + " Inventory. (New Product)";
            var notif = new Notification();
            notif.user = $scope.loginUser.id;
            notif.content = message;
            if ($scope.accessibleBranches.length == 1) {
                notif.branch = $scope.hehe[0].id;
            }
            Notification.save(notif, function () {
                console.log('notif added');
            });
            toaster.success({title: "Success", body:"Product added successfully in the storage!"});
             setTimeout(function () {
                $state.go('products', {});
            }, 2000);
            
        } , function() {
            toaster.error({title: "Error", body:"Cannot add into storage. Please check input fields."});
        });

    };

    $scope.add = function () {
        var product = new Product();
        product.name = $scope.formInfo.itemName;
        product.description = $scope.formInfo.description;
        // product.stock_number = $scope.formInfo.stockNumber;
        product.color = $scope.formInfo.color;
        product.size = $scope.formInfo.size;
        product.subCategory = $scope.formInfo.subCategory;
        // product.quantity = $scope.formInfo.quantity;
        product.price = $scope.formInfo.price;
        product.sellingPrice = $scope.formInfo.sellingprice;
        product.wholesalePrice = $scope.formInfo.wholesaleprice;
        $scope.newProduct = Product.save(product, function () {
            $scope.newProduct1 = $scope.newProduct;
            if ($scope.file) {
                $scope.upload($scope.file);
            }
            setTimeout(function () {
                $scope.rowCollection = Product.query();
            }, 1000);
            $scope.addSuccess = true;
            $scope.disableButtonAdd = true;

            toaster.success({title: "Success", body:"Product added successfully!"});
            // $state.go('products', {});
        } , function() {
            toaster.error({title: "Error", body:"Cannot add product. Please check input fields."});
            console.log("errrrrooor");
        });
        // $scope.clearInput();
    };

    $scope.update = function (productID) {
        var product = Product.get({product: productID});
        product.name = $scope.oneProduct.name;
        product.description = $scope.oneProduct.description;
        product.stock_number = $scope.oneProduct.stock_number;
        product.color = $scope.oneProduct.color;
        product.size = $scope.oneProduct.size;
        // product.quantity = $scope.oneProduct.quantity;
        product.price = $scope.oneProduct.price;
        product.sellingPrice = $scope.oneProduct.sellingPrice;
        product.wholesalePrice = $scope.oneProduct.wholesalePrice;
        product.subCategory = $scope.oneProduct.newsubCategory;
        Product.update({product: productID}, product, function () {
            toaster.success({title: "Success", body:"Product updated successfully!"});
            if ($scope.editFile) {
                $scope.editUpload($scope.editFile, productID);
            }
            setTimeout(function () {
                $scope.rowCollection = Product.query();
            }, 1000);
        } , function() {
            toaster.error({title: "Error", body:"Cannot update the product. Please check input fields."});
        });
    }

    $scope.name = "JIGS";
    $scope.formInfo = {};
    $scope.edit = function (productID) {
        $scope.oneProduct = Product.get({product: productID});
    }

    $scope.showModal = function (id) {
        $scope.oneProduct = Product.get({product: id});
    };

    $scope.clearInput = function () {
        $scope.formInfo.itemName = null;
        $scope.formInfo.description = null;
        $scope.formInfo.stockNumber = null;
        $scope.formInfo.color = null;
        $scope.formInfo.size = null;
        $scope.formInfo.subCategory = null;
        // $scope.formInfo.quantity =null;
        $scope.formInfo.price = null;
    };


    //////////////////////////////////////////////////////////////
    $scope.rowCollection = Product.query();
    $scope.searchBy = "";

    $scope.displayedCollection = [].concat($scope.rowCollection);

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
        Product.delete({product: row.id});
    }

    $scope.isUpdated = function (row) {
        var today = new Date();
        if (!row.last) {
            // console.log(row.last);
            return false;
        }
        var productUpdated = new Date(row.last);
        if (today.getFullYear() == productUpdated.getFullYear() && today.getMonth() == productUpdated.getMonth()) {
            if (productUpdated.getDate() == today.getDate() || productUpdated.getDate() < (today.getDate() - 10)) {
                return true;
            }
        }
        // console.log("hello");
        return false;
    }

    $scope.isPriceChanged = function (row) {
        if (row.hasIncreasedPrice != null) {
            return true
        }
        return false
    }

    // $scope.getSubCategory = function (id) {
    //     return $scope.subCategories[id-1];
    // };
});
