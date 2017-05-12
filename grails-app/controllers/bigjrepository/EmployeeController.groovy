package bigjrepository


import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)

class EmployeeController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
//        params.max = Math.min(max ?: 10, 100)
        respond Employee.list(params), [status: OK]
    }

    @Transactional
    def save(Employee employeeInstance) {
        if (employeeInstance == null) {
            render status: NOT_FOUND
            return
        }

        employeeInstance.validate()
        if (employeeInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        employeeInstance.save flush: true
        respond employeeInstance, [status: CREATED]
    }

    @Transactional
    def update(Employee employeeInstance) {
        if (employeeInstance == null) {
            render status: NOT_FOUND
            return
        }

        employeeInstance.validate()
        if (employeeInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        employeeInstance.save flush: true
        respond employeeInstance, [status: OK]
    }

    @Transactional
    def delete(Employee employeeInstance) {

        if (employeeInstance == null) {
            render status: NOT_FOUND
            return
        }

        employeeInstance.delete flush: true
        render status: NO_CONTENT
    }

    def show(Employee employeeInstance) {
        respond employeeInstance
    }
}
