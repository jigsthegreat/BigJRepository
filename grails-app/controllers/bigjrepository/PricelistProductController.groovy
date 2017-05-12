package bigjrepository



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class PricelistProductController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond PricelistProduct.list(params), [status: OK]
    }

    def products() {
        def results = PricelistProduct.findAll("from PricelistProduct where transaction =" + params.id)
        respond results, [status: OK]
    }

    @Transactional
    def save(PricelistProduct pricelistProductInstance) {
        if (pricelistProductInstance == null) {
            render status: NOT_FOUND
            return
        }

        pricelistProductInstance.validate()
        if (pricelistProductInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        pricelistProductInstance.save flush:true
        respond pricelistProductInstance, [status: CREATED]
    }

    @Transactional
    def update(PricelistProduct pricelistProductInstance) {
        if (pricelistProductInstance == null) {
            render status: NOT_FOUND
            return
        }

        pricelistProductInstance.validate()
        if (pricelistProductInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        pricelistProductInstance.save flush:true
        respond pricelistProductInstance, [status: OK]
    }

    @Transactional
    def delete(PricelistProduct pricelistProductInstance) {

        if (pricelistProductInstance == null) {
            render status: NOT_FOUND
            return
        }

        pricelistProductInstance.delete flush:true
        render status: NO_CONTENT
    }
}
