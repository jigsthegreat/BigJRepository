package bigjrepository



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class TypeController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Type.list(params), [status: OK]
    }

    @Transactional
    def save(Type typeInstance) {
        if (typeInstance == null) {
            render status: NOT_FOUND
            return
        }

        typeInstance.validate()
        if (typeInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        typeInstance.save flush:true
        respond typeInstance, [status: CREATED]
    }

    @Transactional
    def update(Type typeInstance) {
        if (typeInstance == null) {
            render status: NOT_FOUND
            return
        }

        typeInstance.validate()
        if (typeInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        typeInstance.save flush:true
        respond typeInstance, [status: OK]
    }

    @Transactional
    def delete(Type typeInstance) {

        if (typeInstance == null) {
            render status: NOT_FOUND
            return
        }

        typeInstance.delete flush:true
        render status: NO_CONTENT
    }
}
