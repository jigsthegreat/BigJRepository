package bigjrepository



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class NotificationController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        // params.max = Math.min(max ?: 10, 100)
        respond Notification.list(params).sort { -it.id }, [status: OK]
    }

    @Transactional
    def save(Notification notificationInstance) {
        if (notificationInstance == null) {
            render status: NOT_FOUND
            return
        }

        notificationInstance.validate()
        if (notificationInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        notificationInstance.save flush:true
        respond notificationInstance, [status: CREATED]
    }

    @Transactional
    def update(Notification notificationInstance) {
        if (notificationInstance == null) {
            render status: NOT_FOUND
            return
        }

        notificationInstance.validate()
        if (notificationInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        notificationInstance.save flush:true
        respond notificationInstance, [status: OK]
    }

    @Transactional
    def delete(Notification notificationInstance) {

        if (notificationInstance == null) {
            render status: NOT_FOUND
            return
        }

        notificationInstance.delete flush:true
        render status: NO_CONTENT
    }
}
