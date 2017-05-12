package bigjrepository

class Client {
	String name
	String contactNumber
	String address
	Date dateCreated
	Date lastUpdated
	static hasMany = [pricelistTransactions: PricelistTransaction]

    static constraints = {
    	pricelistTransactions cascade: "all-delete-orphan"
    }
}
