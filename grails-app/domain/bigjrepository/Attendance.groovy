package bigjrepository

class Attendance {

    static belongsTo = [employee: Employee]
    Date date
    boolean isPresent
    boolean isWholeDay
    boolean isPaymentReceived

    static constraints = {
        isPaymentReceived nullable: true;
        date unique: 'employee'
    }
}
