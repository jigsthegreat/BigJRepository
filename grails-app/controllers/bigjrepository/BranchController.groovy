package bigjrepository



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class BranchController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Branch.list(params), [status: OK]
    }

    @Transactional
    def save(Branch branchInstance) {
        if (branchInstance == null) {
            render status: NOT_FOUND
            return
        }

        branchInstance.validate()
        if (branchInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        branchInstance.save flush:true
        respond branchInstance, [status: CREATED]
    }

    @Transactional
    def update(Branch branchInstance) {
        if (branchInstance == null) {
            render status: NOT_FOUND
            return
        }

        branchInstance.validate()
        if (branchInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        branchInstance.save flush:true
        respond branchInstance, [status: OK]
    }

    @Transactional
    def delete(Branch branchInstance) {

        if (branchInstance == null) {
            render status: NOT_FOUND
            return
        }

        branchInstance.delete flush:true
        render status: NO_CONTENT
    }
}
