package bigjrepository



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class StorageController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        // params.max = Math.min(max ?: 10, 100)
        respond Storage.list(params), [status: OK]
    }

    def branchProducts() {
        def items = Storage.findAll("from Storage where branch =" + params.id)
        respond items, [status: OK]
    }

    def product() {
        // println params.id
        def item = Storage.find("from Storage where product =" + params.id)
        // println item
        if(item != null) {
            respond item, [status: OK]
        }
        
        render status: OK
    }

    @Transactional
    def save(Storage storageInstance) {
        if (storageInstance == null) {
            render status: NOT_FOUND
            return
        }

        storageInstance.validate()
        if (storageInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        storageInstance.save flush:true
        respond storageInstance, [status: CREATED]
    }
    def show(Storage storageInstance) {
        respond storageInstance
    }

    @Transactional
    def update(Storage storageInstance) {
        if (storageInstance == null) {
            render status: NOT_FOUND
            return
        }

        storageInstance.validate()
        if (storageInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        storageInstance.save flush:true
        respond storageInstance, [status: OK]
    }

    @Transactional
    def delete(Storage storageInstance) {

        if (storageInstance == null) {
            render status: NOT_FOUND
            return
        }

        storageInstance.delete flush:true
        render status: NO_CONTENT
    }
}
