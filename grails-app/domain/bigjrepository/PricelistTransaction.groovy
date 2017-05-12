package bigjrepository

class PricelistTransaction {
	static belongsTo = [client: Client]
	// Client client
    Branch branch
    static hasMany = [pricelistProducts: PricelistProduct]
    Date dateCreated
    Date lastUpdated

    static constraints = {
        pricelistProducts cascade: "all-delete-orphan"
        // branch nullable: true
    }
}
