package bigjrepository

class PurchaseOrderNote {
	String note
	static belongsTo = [purchaseOrderTransaction: PurchaseOrderTransaction]
	Date dateCreated
	Date lastUpdated

    static constraints = {
    }
}
