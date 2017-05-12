package bigjrepository

class Product {

    String name
    String color
    String size
    String description
    // String stock_number
    // int quantity
    double price
    double sellingPrice
    double wholesalePrice
    String photo_extension
    Date dateCreated
    Date lastUpdated
    Date last
    Boolean hasIncreasedPrice
    static belongsTo = [subCategory: SubCategory]
    Type type


    static constraints = {
        sellingPrice nullable: true
        wholesalePrice nullable: true
        photo_extension nullable: true
        last nullable: true
        subCategory nullable: true
        type nullable: true
        description nullable: true
        size nullable: true
        hasIncreasedPrice nullable: true
    }

    def checkIncreasePrice(double newPrice) {
        if (this.getPersistentValue('price') == newPrice) {
            return
        }
        if (this.getPersistentValue('price') < newPrice) {
            return true
        }
        return false
    }

    def removeFromSubCategory() {
        if (this.subCategory != null) {
            def sub = SubCategory.get(this.subCategory.id)
            sub.removeFromProducts(this)
            sub.save flush: true
        }
    }

    def removeFromWholesale() {
        def wholesalesProducts = WholesaleProduct.createCriteria().list {
            product {
                ilike("name", this.name)
            }
        }

        if (wholesalesProducts != null) {
            for (product in wholesalesProducts) {
                product.transaction.removeFromWholesaleProducts(product)
                product.delete flush: true
            }
        }

    }

    def removeFromStorage() {
        def storageProducts = Storage.createCriteria().list {
            product {
                ilike("name", this.name)
            }
        }

        if (storageProducts != null) {
            for (product in storageProducts) {
                product.delete flush: true
            }
        }
    }

    def removeFromPurchaseOrder() {
        def purchaseProducts = PurchaseOrderProduct.createCriteria().list {
            product {
                ilike("name", this.name)
            }
        }

        if (purchaseProducts != null) {
            for (product in purchaseProducts) {
                product.transaction.removeFromOrderedProducts(product)
                product.delete flush: true
            }
        }
    }

}
