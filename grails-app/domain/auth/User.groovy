package auth

class User {

    transient springSecurityService

	String firstName
	String lastName
	String contactNumber
	String gender
	Date birthDate

    String username
    String password

    Role requested_role
    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired

    static transients = ['springSecurityService']

    static constraints = {
        username blank: false, unique: true
        password blank: false
        requested_role nullable: true
        contactNumber nullable: true
    }

    static mapping = {
        password column: '`password`'
    }

    Set<Role> getAuthorities() {
        UserRole.findAllByUser(this).collect { it.role }
    }

    def beforeInsert() {
        encodePassword()
    }

    def beforeUpdate() {
        if (isDirty('password')) {
            encodePassword()
        }
    }

    protected void encodePassword() {
        password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
    }

    def accessibleBranches() {
        def userRole = UserRole.findWhere(user: this)
        def role = Role.get(userRole.role.id)
        return role.accessible_braches
    }

    def changeStatus() {
        def roleUser = Role.findById(this.requested_role.id)
        def roleNonUser = Role.findByAuthority('NON_USER')

        UserRole.remove this, roleNonUser, true
        UserRole.create this, roleUser, true

        this.requested_role = null
        this.enabled = true
        this.save(flush: true)
    }

    def removeFromRole() {
        def userRole = UserRole.findWhere(user: this)
        def role = Role.findById(userRole.role.id)
        UserRole.remove this, role, true
    }

    def updateRole() {
        this.removeFromRole()
        def role = Role.findById(this.requested_role.id)
        UserRole.create this, role, true
        this.requested_role = null
        this.save(flush: true)
    }
}