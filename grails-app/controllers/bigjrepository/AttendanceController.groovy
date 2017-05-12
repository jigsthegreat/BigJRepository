package bigjrepository



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class AttendanceController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
//        params.max = Math.min(max ?: , 100)
        respond Attendance.list(params), [status: OK]
    }

    @Transactional
    def save(Attendance attendanceInstance) {
        if (attendanceInstance == null) {
            render status: NOT_FOUND
            return
        }

        attendanceInstance.validate()

        if (attendanceInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        attendanceInstance.save flush:true
        respond attendanceInstance, [status: CREATED]
    }

    @Transactional
    def update(Attendance attendanceInstance) {
        if (attendanceInstance == null) {
            render status: NOT_FOUND
            return
        }

        attendanceInstance.validate()
        if (attendanceInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        attendanceInstance.save flush:true
        respond attendanceInstance, [status: OK]
    }

    @Transactional
    def delete(Attendance attendanceInstance) {

        if (attendanceInstance == null) {
            render status: NOT_FOUND
            return
        }

        attendanceInstance.delete flush:true
        render status: NO_CONTENT
    }

    def show(Attendance attendanceInstance) {
        respond attendanceInstance
    }
}
