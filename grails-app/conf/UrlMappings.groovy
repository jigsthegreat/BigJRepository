class UrlMappings {

    static mappings = {

        "/api/products"(resources: "product")
        "/api/clients"(resources: "client")
        "/api/suppliers"(resources: "supplier")
        "/api/pricelist-transactions"(resources: "pricelistTransaction")
        "/api/pricelist-products"(resources: "pricelistProduct")
        "/api/pricelist-transaction-products/$id"(controller: "pricelistProduct", action: "products")
        "/api/purchase-order-products"(resources: "purchaseOrderProduct")
        "/api/purchase-order-transactions"(resources: "purchaseOrderTransaction")
        "/api/purchase-order-transaction-products/$id"(controller: "purchaseOrderProduct", action: "products")

        "/api/categories"(resources: "category")
        "/api/types"(resources: "type")
        "/api/sub-categories"(resources: "subCategory")

        "/upload"(controller: "product", action: "upload")
        "/editUpload/$id"(controller: "product", action: "editUpload")

        "/api/product-storage"(resources: "storage")
        "/api/storage/$id"(controller: "storage", action: "product")
        // "/store"(controller: "storage", action: "storeProduct")

        "/api/branches"(resources: "branch")
        "/api/branch-products/$id"(controller: "storage", action: "branchProducts")

        "/api/users"(resources: "user")
        "/api/users/getAccessibleBranches"(controller: "user", action: "getAccessibleBranches")
        "/api/users/changeStatus/$id"(controller: "user", action: "changeStatus")
        "/api/users/getNonUsers"(controller: "user", action: "getNonUsers")
        "/api/users/userLoggedIn"(controller: "user", action: "userLoggedIn")

        "/api/employees"(resources: "employee")
        "/api/attendances"(resources: "attendance")

        "/api/notifications"(resources: "notification")
        // "/$controller/$action?/$id?(.$format)?" {
        //     constraints {
        //         // apply constraints here
        //     }
        // }

        "/"(view: "/index")
//        "/"(uri: "/js/partials/index.html")
        "500"(view: '/error')
    }
}
