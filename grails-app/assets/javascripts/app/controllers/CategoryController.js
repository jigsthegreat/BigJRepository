angular.module('BigJApp').controller('CategoryController', function ($scope, $state, $stateParams, toaster, Category, SubCategory, Branch, branchId) {
    var categoryId = $stateParams.id;
    $scope.categories = Category.query();
    $scope.subCategories = SubCategory.query();
    // $scope.selectedCategory = null;
    $scope.show = false;
    // $scope.newCategory = null;
    // $scope.category = null;
    // $scope.subCategory = null;

    if ($stateParams.id != null) {
        $scope.category = Category.get({category: categoryId});
    }
    $scope.subCategoryName = {content: null};

    $scope.setCategory = function (category) {
        $scope.selectedCategory = category;
    };

    $scope.selectCategory = function(category) {
        $scope.category = category;
        $scope.show = true;
    }

    $scope.selectSubCategory = function(subCategory) {
        $scope.subCategory = subCategory;
    }

    $scope.addCategory = function (newName) {
        // var category = new Category();
        // category.name = $scope.newname;
        var data = {name: newName};
        Category.save(data, function () {
            // setTimeout(function () {
                $scope.categories = Category.query();
                $scope.clearmodal();
                toaster.success({title: "SUCCESSFUL", body:"Added category."});
            // }, 1000);
        } , function() {
            toaster.error({title: "Error", body:"Error in adding category."});
        });
    };
    $scope.clearmodal = function() {
      $scope.data = "";
    }
    $scope.addSubCategory = function () {
        var subCategory = new SubCategory();
        subCategory.name = $scope.subCategoryName.content;
        subCategory.category = $scope.selectedCategory.id;
        SubCategory.save(subCategory, function () {
            setTimeout(function () {
                $scope.subCategories = SubCategory.query();
            }, 1000);
        });
        $scope.subCategoryName = {content: null};
    };

    $scope.deleteCategory = function (category) {
        Category.delete({category: category.id}, function () {
            toaster.pop({title: "SUCCESSFUL", body:"Deleted category."});
            setTimeout(function () {
                $scope.categories = Category.query();
            }, 1000);
        });
    };

    $scope.deleteSubCategory = function (subCategory) {
        SubCategory.delete({subCategory: subCategory.id}, function () {
            toaster.pop({title: "SUCCESSFUL", body:"Deleted subcategory."});
            setTimeout(function () {
                $scope.subCategories = SubCategory.query();
            }, 1000);
        });
    };

    $scope.update = function () {
        var data = {name: $scope.category.name};
        // category.name = $scope.category.name;
        Category.update({category: $scope.category.id}, data, function () {
            toaster.success({title: "SUCCESSFUL", body:"Updated category."});
        });
    };

    $scope.updateSubCategory = function () {
        // var subcategory = SubCategory.get({subCategory: subCategoryId});

        var data = {name: $scope.subCategory.name};
        // subcategory.category = $scope.subCategory.category.id;
        SubCategory.update({subCategory: $scope.subCategory.id}, data, function () {
            // $state.go('categories');
            toaster.success({title: "SUCCESSFUL", body:"Updated subcategory."});
        });
    };

    $scope.branches = Branch.query(function() {
        $scope.selected = $scope.branches[0].id;
    });

    $scope.onChange = function(branch) {
        // console.log(branch.id);
        branchId.value = branch.id;
        console.log("global id: " + branchId.value);
    };
});
