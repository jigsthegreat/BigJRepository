package bigjrepository



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class PurchaseOrderProductController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond PurchaseOrderProduct.list(params), [status: OK]
    }

    def products() {
        def results = PurchaseOrderProduct.findAll("from PurchaseOrderProduct where transaction =" + params.id)
        respond results, [status: OK]
    }

    @Transactional
    def save(PurchaseOrderProduct purchaseOrderProductInstance) {
        if (purchaseOrderProductInstance == null) {
            render status: NOT_FOUND
            return
        }

        purchaseOrderProductInstance.validate()
        if (purchaseOrderProductInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        purchaseOrderProductInstance.save flush:true
        respond purchaseOrderProductInstance, [status: CREATED]
    }

    @Transactional
    def update(PurchaseOrderProduct purchaseOrderProductInstance) {
        if (purchaseOrderProductInstance == null) {
            render status: NOT_FOUND
            return
        }

        purchaseOrderProductInstance.validate()
        if (purchaseOrderProductInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        purchaseOrderProductInstance.save flush:true
        respond purchaseOrderProductInstance, [status: OK]
    }

    @Transactional
    def delete(PurchaseOrderProduct purchaseOrderProductInstance) {

        if (purchaseOrderProductInstance == null) {
            render status: NOT_FOUND
            return
        }

        purchaseOrderProductInstance.delete flush:true
        render status: NO_CONTENT
    }
}
