package bigjrepository


import static org.springframework.http.HttpStatus.*
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class ProductController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        // params.max = Math.min(max ?: 10, 100)
        respond Product.list(params), [status: OK]
    }

    def show(Product productInstance) {
        respond productInstance
    }

    @Transactional
    def save(Product productInstance) {
        if (productInstance == null) {
            render status: NOT_FOUND
            return
        }

        productInstance.validate()
        if (productInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }
        productInstance.save flush: true
        // productInstance.last = productInstance.lastUpdated
        // productInstance.save flush:true
        respond productInstance, [status: CREATED]
    }

    @Transactional
    def update(Product productInstance) {
        def product1 = Product.get(productInstance.id)
        if (productInstance == null) {
            render status: NOT_FOUND
            return
        }

        productInstance.validate()
        if (productInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }
        productInstance.last = productInstance.lastUpdated
        productInstance.hasIncreasedPrice = product1.checkIncreasePrice(productInstance.price)
        productInstance.save flush: true
        respond productInstance, [status: OK]
    }

    @Transactional
    def delete(Product productInstance) {

        if (productInstance == null) {
            render status: NOT_FOUND
            return
        }
        def file = new File(grailsApplication.config.images.location.toString() + productInstance.id + "." + productInstance.photo_extension)
        if (file != null) {
            file.delete()
        }

        productInstance.removeFromSubCategory()
        productInstance.removeFromWholesale()
        productInstance.removeFromStorage()
        productInstance.removeFromPurchaseOrder()
        productInstance.delete flush: true
        render status: NO_CONTENT
    }

    def upload() {
        def file = request.getFile('myFile')
        if (file == null) {
            render status: NOT_FOUND
            return
        } else {
            def lastInserted = Product.find("from Product order by id desc")
            def product = Product.get(lastInserted.id)

            if (file.contentType == "image/jpeg") {
                product.photo_extension = 'jpg'
            } else {
                product.photo_extension = 'png'
            }
            product.save flush: true
            def filename = grailsApplication.config.images.location.toString() + lastInserted.id + '.' + product.photo_extension
            file.transferTo(new File(filename))
            render(status: 200, text: "OK")
        }
    }

    def editUpload() {
        def file = request.getFile('myFile')
        if (file == null) {
            render status: NOT_FOUND
            return
        } else {
            def product = Product.get(params.id)

            if (file.contentType == "image/jpeg") {
                product.photo_extension = 'jpg'
            } else {
                product.photo_extension = 'png'
            }
            product.save flush: true
            def filename = grailsApplication.config.images.location.toString() + params.id + '.' + product.photo_extension
            file.transferTo(new File(filename))
            render(status: 200, text: "OK")
        }
    }

}

