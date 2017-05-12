package bigjrepository

class Employee {

    String firstName
    String middleName
    String lastName
    String contactNumber
    String address
    Date birthdate
    Branch branch
    Double salaryRate
    Date dateCreated
	Date lastUpdated
	
    static hasMany = [attendances: Attendance]
    static constraints = {
    }

}
