package bigjrepository


import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class SubCategoryController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond SubCategory.list(params), [status: OK]
    }

    @Transactional
    def save(SubCategory subCategoryInstance) {
        if (subCategoryInstance == null) {
            render status: NOT_FOUND
            return
        }

        subCategoryInstance.validate()
        if (subCategoryInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        subCategoryInstance.save flush: true
        respond subCategoryInstance, [status: CREATED]
    }

    @Transactional
    def update(SubCategory subCategoryInstance) {
        if (subCategoryInstance == null) {
            render status: NOT_FOUND
            return
        }

        subCategoryInstance.validate()
        if (subCategoryInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        subCategoryInstance.save flush: true
        respond subCategoryInstance, [status: OK]
    }

    @Transactional
    def delete(SubCategory subCategoryInstance) {

        if (subCategoryInstance == null) {
            render status: NOT_FOUND
            return
        }
        subCategoryInstance.detachProducts()
        subCategoryInstance.delete flush: true
        render status: NO_CONTENT
    }

    def show(SubCategory subCategory) {
        respond subCategory
    }
}
