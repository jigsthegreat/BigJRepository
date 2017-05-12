angular.module('BigJApp').controller('SubCategoryController', function ($scope, $state, $stateParams, SubCategory, Category) {
    $scope.categories = Category.query();
    var subCategoryId = $stateParams.id;
    $scope.subCategory = SubCategory.get({subCategory: subCategoryId});

    $scope.add = function () {
        var subcategory = new SubCategory();
        subcategory.name = $scope.subcategoryName;
        subcategory.category = $scope.category.id;
        SubCategory.save(subcategory);
    };

    $scope.update = function () {
        var subcategory = SubCategory.get({subCategory: subCategoryId});
        subcategory.name = $scope.subCategory.name;
        subcategory.category = $scope.subCategory.category.id;
        SubCategory.update({subCategory: subCategoryId}, subcategory, function () {
            $state.go('categories');
        });
    };
});