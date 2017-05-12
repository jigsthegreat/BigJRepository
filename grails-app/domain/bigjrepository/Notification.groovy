package bigjrepository
import auth.*

class Notification {
	User user
	Branch branch
	String content
	Date dateCreated
	Date lastUpdated

    static constraints = {
    	branch nullable: true
    }
}
