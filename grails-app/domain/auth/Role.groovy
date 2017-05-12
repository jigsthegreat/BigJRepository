package auth

import bigjrepository.Branch

class Role {

	String authority
	static hasMany = [accessible_braches: Branch]

	static mapping = {
		cache true
	}

	static constraints = {
		authority blank: false, unique: true
		accessible_braches nullable: true
	}
}
