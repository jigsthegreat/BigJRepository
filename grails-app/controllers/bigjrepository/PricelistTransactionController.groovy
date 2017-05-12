package bigjrepository



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class PricelistTransactionController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        // params.max = Math.min(max ?: 10, 100)
        respond PricelistTransaction.list(params), [status: OK]
    }

    def show(PricelistTransaction pricelistTransactionInstance) {
        respond pricelistTransactionInstance
    }

    @Transactional
    def save(PricelistTransaction pricelistTransactionInstance) {
        if (pricelistTransactionInstance == null) {
            render status: NOT_FOUND
            return
        }

        pricelistTransactionInstance.validate()
        if (pricelistTransactionInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        pricelistTransactionInstance.save flush:true
        respond pricelistTransactionInstance, [status: CREATED]
    }

    @Transactional
    def update(PricelistTransaction pricelistTransactionInstance) {
        if (pricelistTransactionInstance == null) {
            render status: NOT_FOUND
            return
        }

        pricelistTransactionInstance.validate()
        if (pricelistTransactionInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        pricelistTransactionInstance.save flush:true
        respond pricelistTransactionInstance, [status: OK]
    }

    @Transactional
    def delete(PricelistTransaction pricelistTransactionInstance) {

        if (pricelistTransactionInstance == null) {
            render status: NOT_FOUND
            return
        }

        pricelistTransactionInstance.delete flush:true
        render status: NO_CONTENT
    }
}
