package bigjrepository

class Storage {
	Product product
	String stockNumber
	Supplier supplier
	int quantity
	Branch branch
	String unit
	// int temporaryQuantity
	Date dateCreated
	Date lastUpdated

    static constraints = {
    	product(unique: 'branch')
    	branch nullable: true
    	quantity nullable: true
    	unit nullable: true
    }
}
