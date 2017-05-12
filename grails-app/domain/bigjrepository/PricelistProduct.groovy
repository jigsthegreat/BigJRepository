package bigjrepository

class PricelistProduct {
	Product product
	double price
	int quantity
	String stockNumber
	String unit
	static belongsTo = [transaction: PricelistTransaction]
	static mappedBy = [product: "none"]
	Date dateCreated
	Date lastUpdated

    static constraints = {
    	unit nullable: true
        quantity nullable: true
        stockNumber nullable: true
    }
}
