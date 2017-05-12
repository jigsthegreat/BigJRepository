package bigjrepository
// import org.joda.time.*

class PurchaseOrderTransaction {
	static belongsTo = [supplier: Supplier]
	// Supplier supplier
	// String status
	String shipVia
	static hasMany = [orderedProducts: PurchaseOrderProduct, notes: PurchaseOrderNote]
	Date dateCreated
	Date lastUpdated

	Date dateToReceive
	Date dateOrdered
	Date dateReceived

	Branch branch
	
    static constraints = {
    	// dateToReceive nullable: true
    	dateReceived nullable: true
    	// branch nullable: true
    }
}
