package bigjrepository



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class SupplierController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        // params.max = Math.min(max ?: 10, 100)
        respond Supplier.list(params), [status: OK]
    }

    @Transactional
    def save(Supplier supplierInstance) {
        if (supplierInstance == null) {
            render status: NOT_FOUND
            return
        }

        supplierInstance.validate()
        if (supplierInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        supplierInstance.save flush:true
        respond supplierInstance, [status: CREATED]
    }

    @Transactional
    def update(Supplier supplierInstance) {
        if (supplierInstance == null) {
            render status: NOT_FOUND
            return
        }

        supplierInstance.validate()
        if (supplierInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        supplierInstance.save flush:true
        respond supplierInstance, [status: OK]
    }

    @Transactional
    def delete(Supplier supplierInstance) {

        if (supplierInstance == null) {
            render status: NOT_FOUND
            return
        }

        supplierInstance.delete flush:true
        render status: NO_CONTENT
    }
}
