package bigjrepository



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class PurchaseOrderTransactionController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        // params.max = Math.min(max ?: 10, 100)
        respond PurchaseOrderTransaction.list(params), [status: OK]
    }

    def show(PurchaseOrderTransaction purchaseOrderTransactionInstance) {
        respond purchaseOrderTransactionInstance
    }

    @Transactional
    def save(PurchaseOrderTransaction purchaseOrderTransactionInstance) {
        if (purchaseOrderTransactionInstance == null) {
            render status: NOT_FOUND
            return
        }

        purchaseOrderTransactionInstance.validate()
        if (purchaseOrderTransactionInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        purchaseOrderTransactionInstance.save flush:true
        respond purchaseOrderTransactionInstance, [status: CREATED]
    }

    @Transactional
    def update(PurchaseOrderTransaction purchaseOrderTransactionInstance) {
        if (purchaseOrderTransactionInstance == null) {
            render status: NOT_FOUND
            return
        }

        purchaseOrderTransactionInstance.validate()
        if (purchaseOrderTransactionInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        purchaseOrderTransactionInstance.save flush:true
        respond purchaseOrderTransactionInstance, [status: OK]
    }

    @Transactional
    def delete(PurchaseOrderTransaction purchaseOrderTransactionInstance) {

        if (purchaseOrderTransactionInstance == null) {
            render status: NOT_FOUND
            return
        }

        purchaseOrderTransactionInstance.delete flush:true
        render status: NO_CONTENT
    }
}
