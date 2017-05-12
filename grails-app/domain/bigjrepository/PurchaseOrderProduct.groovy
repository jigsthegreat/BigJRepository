package bigjrepository

class PurchaseOrderProduct {

    // static hasOne = [product: Product]
	Product product
	int quantity
	String unit
	String stockNumber
	String description
	boolean newProduct
	double unitPrice
	double discount
	String notes
	boolean stored
	static belongsTo = [transaction: PurchaseOrderTransaction]
	static mappedBy = [product: "none"]
	Date dateCreated
	Date lastUpdated

    static constraints = {
    	unit nullable: true
    	description nullable: true
    	stockNumber nullable: true
    	newProduct nullable: true
    	discount nullable: true
    	notes nullable: true
    	stored nullable: true
    }
}
