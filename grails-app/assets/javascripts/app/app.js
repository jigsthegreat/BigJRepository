'use strict';
var deps = [
    'ui.bootstrap',
    'ngResource',
    'ui.router',
    'smart-table',
    'ngFileUpload',
    'xeditable',
    'satellizer',
    'ui.bootstrap.datetimepicker',
    'gm.typeaheadDropdown',
    'toaster',
    'ngAnimate',
    'mwl.confirm',
    'daterangepicker',
    'checklist-model'
];

var app = angular.module('BigJApp', deps);


app.value('branchId', {
    value: null
});

app.service('Service', function() {
    var itemss = [];
    return {
        // $scope.users = [];
        getItems: function($scope) {
            return itemss;
        },
        setItems: function(items, $scope) {
            itemss = items;
        }
    }
});

// app.service('DisableService', function() {
//     var status = false;
//     return {
//         // $scope.users = [];
//         getStatus: function() {
//             return status;
//         },
//         setStatus: function(stat) {
//             status = stat;
//         }
//     }
// });

app.factory('Branch', function ($resource) {
    return $resource('api/branches/:branch', {
        branch: '@branch'
    }, {
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        }
    });
});

app.factory('BP', function ($resource) {
    return $resource('api/branch-products/:bp', {
        bp: '@bp'
    }, {
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        },
        get: {
            method: "GET",
            isArray: true
        }
    });
});

app.factory('Product', function ($resource) {
    return $resource('api/products/:product', {
        product: '@product'
    }, {
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        }
    });
});

app.factory('Client', function ($resource) {
    return $resource('api/clients/:client', {
        client: '@client'
    }, {
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        }
    });
});

app.factory('Supplier', function ($resource) {
    return $resource('api/suppliers/:supplier', {
        supplier: '@supplier'
    }, {
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        }
    });
});

app.factory('Pricelist', function ($resource) {
    return {
        transaction: $resource('api/pricelist-transactions/:pricelistTransaction', {
            pricelistTransaction: '@pricelistTransaction'
        }, {
            update: {
                method: "PUT"
            },
            delete: {
                method: "DELETE"
            }
        }),
        transactionProduct: $resource('api/pricelist-transaction-products/:tp', {
            tp: '@tp'
        }, {
            update: {
                method: "PUT"
            },
            delete: {
                method: "DELETE"
            },
            get: {
                method: "GET",
                isArray: true
            }
        }),
        product: $resource('api/pricelist-products/:pricelistProduct', {
            pricelistProduct: '@pricelistProduct'
        }, {
            update: {
                method: "PUT"
            },
            delete: {
                method: "DELETE"
            }
        })
    }
});

app.factory('PurchaseOrder', function ($resource) {
    return {
        transaction: $resource('api/purchase-order-transactions/:orderedTransaction', {
            orderedTransaction: '@orderedTransaction'
        }, {
            update: {
                method: "PUT"
            },
            delete: {
                method: "DELETE"
            }
        }),
        product: $resource('api/purchase-order-products/:orderedProduct', {
            orderedProduct: '@orderedProduct'
        }, {
            update: {
                method: "PUT"
            },
            delete: {
                method: "DELETE"
            }
        }),
        transactionProduct: $resource('api/purchase-order-transaction-products/:tp', {
            tp: '@tp'
        }, {
            update: {
                method: "PUT"
            },
            delete: {
                method: "DELETE"
            },
            get: {
                method: "GET",
                isArray: true
            }
        })
    }
});

app.factory('SP', function ($resource) {
    return $resource('api/storage/:storage', {
        storage: '@storage'
    }, {
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        }
    });
});

app.factory('Storage', function ($resource) {
    return $resource('api/product-storage/:storage', {
        storage: '@storage'
    }, {
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        }
    });
});

app.factory('Category', function ($resource) {
    return $resource('api/categories/:category', {
        storage: '@category'
    }, {
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        }
        //, get: {method: "GET", isArray: true}
    });
});

app.factory('SubCategory', function ($resource) {
    return $resource('api/sub-categories/:subCategory', {
        storage: '@subCategory'
    }, {
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        }
    });
});

app.factory('Employee', function ($resource) {
    return $resource('api/employees/:employee', {
        storage: '@employee'
    }, {
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        }
    });
});

app.factory('Attendance', function ($resource) {
    return $resource('api/attendances/:attendance', {
        storage: '@attendance'
    }, {
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        }
    });
});

app.factory('Notification', function ($resource) {
    return $resource('api/notifications/:notification', {
        // storage: '@attendance'
    }, {
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        }
    });
});

app.factory('User', function ($resource) {
    return {
        User: $resource('api/users/:user', {storage: '@user'}, {update: {method: "PUT"}, delete: {method: "DELETE"}}),
        GetAccessibleBranches: $resource('api/users/getAccessibleBranches', {}, {get: {method: 'GET'}}),
        ChangeStatus: $resource('api/users/changeStatus/:id'),
        GetNonUsers: $resource('api/users/getNonUsers/:user', {storage: '@user'}, {get: {method: 'GET'}}),
        UserLoggedIn: $resource('api/users/userLoggedIn', {}, {get: {method: 'GET'}})
    }
});

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
    $authProvider.loginUrl = 'BigJRepository/api/login';
    $authProvider.tokenName = 'access_token';
    $urlRouterProvider.otherwise('/signin');
    // $locationProvider.html5Mode(true);
    //$urlRouterProvider.otherwise("/products")

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "assets/app/partials/home.html",
            controller: 'HomeController',
            data: {
                requireLogin: true
            }
        })
        .state('signup', {
            url: "/signup",
            templateUrl: "assets/app/partials/signup.html",
            controller: 'UserController',
            data: {
                requireLogin: false
            }
        })
        .state('clients', {
            url: "/clients",
            templateUrl: "assets/app/partials/clients.html",
            controller: 'ClientController',
            data: {
                requireLogin: true
            }
        })

        .state('suppliers', {
            url: "/suppliers",
            templateUrl: "assets/app/partials/suppliers.html",
            controller: 'SupplierController',
            data: {
                requireLogin: true
            }
        })

        .state('signin', {
            url: "/signin",
            controller: 'UserController',
            templateUrl: "assets/app/partials/signin.html",
            data: {
                requireLogin: false
            }
        })
        .state('products', {
            url: "/products",
            templateUrl: "assets/app/partials/products.html",
            controller: 'ProductController',
            data: {
                requireLogin: true
            }
        })
        .state('add-product', {
            url: "/add-product",
            templateUrl: "assets/app/partials/product-add.html",
            controller: 'ProductController',
            data: {
                requireLogin: true
            }
        })
        .state('add-client', {
            url: "/add-client",
            templateUrl: "assets/app/partials/client-add.html",
            controller: 'ClientController',
            data: {
                requireLogin: true
            }
        })
        .state('add-supplier', {
            url: "/add-supplier",
            templateUrl: "assets/app/partials/supplier-add.html",
            controller: 'SupplierController',
            data: {
                requireLogin: true
            }
        })
        .state('add-pricelist-transaction', {
            url: "/add-pricelist-transaction",
            templateUrl: "assets/app/partials/pricelist-transaction-add.html",
            controller: 'PricelistTransactionController',
            data: {
                requireLogin: true
            }
        })
        .state('pricelist-transaction', {
            url: "/pricelist-transaction/:id",
            templateUrl: "assets/app/partials/pricelist-transaction.html",
            controller: 'PricelistController',
            data: {
                requireLogin: true
            }
        })
        .state('pricelist-print', {
            url: "/pricelist-print/:id",
            templateUrl: "assets/app/partials/pricelist-print.html",
            controller: 'PricelistController',
            data: {
                requireLogin: true
            }
        })
        .state('pricelist-transactions', {
            url: "/pricelist-transactions",
            templateUrl: "assets/app/partials/pricelist-transactions.html",
            controller: 'PricelistController',
            data: {
                requireLogin: true
            }
        })
        .state('add-purchase-order-transaction', {
            url: "/add-purchase-order-transaction",
            templateUrl: "assets/app/partials/purchase-order-transaction-add.html",
            controller: 'PurchaseOrderTransactionController as ctrl',
            data: {
                requireLogin: true
            }
        })
        .state('purchase-order-transaction', {
            url: "/purchase-order-transaction/:id",
            templateUrl: "assets/app/partials/purchase-order-transaction.html",
            controller: 'PurchaseOrderController',
            data: {
                requireLogin: true
            }
        })
        .state('purchase-order-print', {
            url: "/purchase-order-print/:id",
            templateUrl: "assets/app/partials/purchase-order-print.html",
            controller: 'PurchaseOrderController',
            data: {
                requireLogin: true
            }
        })
        .state('purchase-order-transactions', {
            url: "/purchase-order-transactions",
            templateUrl: "assets/app/partials/purchase-order-transactions.html",
            controller: 'PurchaseOrderController',
            data: {
                requireLogin: true
            }
        })
        .state('categories', {
            url: "/categories",
            templateUrl: "assets/app/partials/categories.html",
            controller: 'CategoryController',
            data: {
                requireLogin: true
            }
        })
        .state('edit-subcategory', {
            url: "/edit-subcategory/:id",
            templateUrl: "assets/app/partials/subCategory-edit.html",
            controller: 'SubCategoryController',
            data: {
                requireLogin: true
            }
        })
        .state('edit-category', {
            url: "/edit-category/:id",
            templateUrl: "assets/app/partials/category-edit.html",
            controller: 'CategoryController',
            data: {
                requireLogin: true
            }
        })
        .state('storage', {
            url: "/storage",
            templateUrl: "assets/app/partials/storage.html",
            controller: 'StorageController',
            data: {
                requireLogin: true
            }
        })
        .state('edit-user', {
            url: "/edit-user/:id",
            templateUrl: "assets/app/partials/user-edit.html",
            controller: 'UserController',
            data: {
                requireLogin: true
            }
        })
        .state('employees', {
            url: "/employees",
            templateUrl: "assets/app/partials/employees.html",
            controller: 'EmployeeController',
            data: {
                requireLogin: true
            }
        })
        .state('add-dtr', {
            url: "/dtr",
            templateUrl: "assets/app/partials/dtr.html",
            controller: 'EmployeeController',
            data: {
                requireLogin: true
            }
        })
        // .state('add-payroll', {
        //     url: "/payroll",
        //     templateUrl: "assets/app/partials/payroll.html",
        //     controller: 'EmployeeController',
        //     data: {
        //         requireLogin: true
        //     }
        // })
        .state('edit-employee', {
            url: "/edit-employee/:id",
            templateUrl: "assets/app/partials/employee-edit.html",
            controller: 'EmployeeController',
            data: {
                requireLogin: true
            }
        })
        .state('attendances', {
            url: "/attendances",
            templateUrl: "assets/app/partials/attendances.html",
            controller: 'AttendanceController',
            data: {
                requireLogin: true
            }

        })
        .state('add-attendance', {
            url: "/addAttendance/:employee",
            templateUrl: "assets/app/partials/attendance-add.html",
            controller: 'AttendanceController',
            data: {
                requireLogin: true
            }
        })
        .state('edit-attendance', {
            url: "/editAttendance/:employee/:id",
            templateUrl: "assets/app/partials/attendance-edit.html",
            controller: 'AttendanceController',
            data: {
                requireLogin: true
            }
        })
        .state('payroll', {
            url: "/payroll",
            templateUrl: "assets/app/partials/payroll.html",
            controller: 'PayrollController',
            data: {
                requireLogin: true
            }
        })
        .state('signup-success', {
            url: "/signup-success",
            templateUrl: "assets/app/partials/signup-success.html",
            // controller: 'PayrollController',
            data: {
                requireLogin: false
            }
        })
        ;
});

app.run(function (editableOptions, $rootScope, $auth, $state) {
    editableOptions.theme = 'bs3';

    $rootScope.$on('$stateChangeStart', function (event, toState) {
        var requireLogin = toState.data.requireLogin;

        if (requireLogin && !$auth.isAuthenticated()) {
            event.preventDefault();

        } else if (!requireLogin && $auth.isAuthenticated()) {
            event.preventDefault();
            $state.go('products');
        }
    });
});
