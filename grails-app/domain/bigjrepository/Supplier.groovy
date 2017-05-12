package bigjrepository

class Supplier {
	String name
	String contactNumber
	String address
	static hasMany = [purchaseOrderTransactions: PurchaseOrderTransaction]
	Date dateCreated
	Date lastUpdated

    static constraints = {
    	purchaseOrderTransactions cascade: "all-delete-orphan"
    }
}
