package bigjrepository

class Category {
	String name
    static hasMany = [subCategories: SubCategory]
    Date dateCreated
	Date lastUpdated

    static constraints = {
        subCategories cascade: "all-delete-orphan"
    }
}
