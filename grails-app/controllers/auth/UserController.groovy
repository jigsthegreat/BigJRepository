package auth


import grails.plugin.springsecurity.SpringSecurityService
import grails.plugin.springsecurity.annotation.Secured
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
@Transactional(readOnly = true)
class UserController {

    def springSecurityService
    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond User.list(params), [status: OK]
    }

    @Transactional
    def save(User userInstance) {
        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        userInstance.validate()
        if (userInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        userInstance.save flush: true
        def role = Role.findByAuthority('NON_USER')
        UserRole.create userInstance, role, true
        respond userInstance, [status: CREATED]
    }

    @Transactional
    def update(User userInstance) {
        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        userInstance.validate()
        if (userInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        userInstance.save flush: true
        userInstance.updateRole()
        respond userInstance, [status: OK]
    }

    @Transactional
    def delete(User userInstance) {

        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }
        userInstance.removeFromRole()
        userInstance.delete flush: true
        render status: NO_CONTENT
    }

    def show(User userInstance) {
        respond userInstance
    }

    @Secured(['isFullyAuthenticated()'])
    def getAccessibleBranches() {
        def authId = springSecurityService.principal.id
        respond User.get(authId).accessibleBranches()
    }

    @Secured(['isFullyAuthenticated()'])
    def getNonUsers() {
        def role = Role.findByAuthority('NON_USER')
        def users = UserRole.findAllByRole(role).user
        respond users, [status: OK]
    }

    @Secured(['isFullyAuthenticated()'])
    def changeStatus(User userInstance) {
        userInstance.changeStatus()

        render status: OK
    }

    @Secured(['isFullyAuthenticated()'])
    def userLoggedIn() {
        def user = springSecurityService.getCurrentUser()
        if (user == null) {
            render status: NOT_FOUND
        } else {
            respond user, [status: OK]
        }
    }
}
