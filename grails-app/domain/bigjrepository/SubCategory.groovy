package bigjrepository

class SubCategory {
    String name
    static belongsTo = [category: Category]
    static hasMany = [products: Product]
    Date dateCreated
	Date lastUpdated

    static constraints = {
    }

    def detachProducts() {
        this.products.collect().each { this.removeFromProducts(it) }
    }
}
