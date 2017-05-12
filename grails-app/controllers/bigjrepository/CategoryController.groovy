package bigjrepository


import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class CategoryController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Category.list(params), [status: OK]
    }

    @Transactional
    def save(Category categoryInstance) {
        if (categoryInstance == null) {
            render status: NOT_FOUND
            return
        }

        categoryInstance.validate()
        if (categoryInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        categoryInstance.save flush: true
        respond categoryInstance, [status: CREATED]
    }

    @Transactional
    def update(Category categoryInstance) {
        if (categoryInstance == null) {
            render status: NOT_FOUND
            return
        }

        categoryInstance.validate()
        if (categoryInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        categoryInstance.save flush: true
        respond categoryInstance, [status: OK]
    }

    @Transactional
    def delete(Category categoryInstance) {

        if (categoryInstance == null) {
            render status: NOT_FOUND
            return
        }
        categoryInstance.subCategories.collect().each {
            it.detachProducts()
        }
        categoryInstance.delete flush: true
        render status: NO_CONTENT
    }

    def show(Category category) {
        respond category
    }
}
