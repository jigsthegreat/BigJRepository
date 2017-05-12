package bigjrepository



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class ClientController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        // params.max = Math.min(max ?: 10, 100)
        respond Client.list(params), [status: OK]
    }

    @Transactional
    def save(Client clientInstance) {
        if (clientInstance == null) {
            render status: NOT_FOUND
            return
        }

        clientInstance.validate()
        if (clientInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        clientInstance.save flush:true
        respond clientInstance, [status: CREATED]
    }

    @Transactional
    def update(Client clientInstance) {
        if (clientInstance == null) {
            render status: NOT_FOUND
            return
        }

        clientInstance.validate()
        if (clientInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        clientInstance.save flush:true
        respond clientInstance, [status: OK]
    }

    @Transactional
    def delete(Client clientInstance) {

        if (clientInstance == null) {
            render status: NOT_FOUND
            return
        }

        clientInstance.delete flush:true
        render status: NO_CONTENT
    }
}
