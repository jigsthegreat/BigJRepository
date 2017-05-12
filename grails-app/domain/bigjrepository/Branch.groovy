package bigjrepository

class Branch {
	String name
	String address
	String contactNumber
	String faxNumber
	String email
	Date dateCreated
	Date lastUpdated

    static constraints = {
    	contactNumber nullable: true
    	faxNumber nullable: true
		email nullable: true
    }
}
