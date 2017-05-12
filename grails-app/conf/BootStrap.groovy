import bigjrepository.*
import auth.*
import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->
        JSON.registerObjectMarshaller(Branch) {
            def map = [:]
            map['id'] = it.id
            map['name'] = it.name
            map['address'] = it.address
            map['contactNumber'] = it.contactNumber
            map['faxNumber'] = it.faxNumber
            map['email'] = it.email
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(Client) {
            def map = [:]
            map['id'] = it.id
            map['name'] = it.name
            map['contactNumber'] = it.contactNumber
            map['address'] = it.address
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(Supplier) {
            def map = [:]
            map['id'] = it.id
            map['name'] = it.name
            map['contactNumber'] = it.contactNumber
            map['address'] = it.address
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(Type) {
            def map = [:]
            map['id'] = it.id
            map['name'] = it.name
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(Category) {
            def map = [:]
            map['id'] = it.id
            map['name'] = it.name
            map['subCategories'] = it.subCategories
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(SubCategory) {
            def map = [:]
            map['id'] = it.id
            map['name'] = it.name
            map['category'] = it.category
            map['products'] = it.products
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(Product) {
            def map = [:]
            map['id'] = it.id
            map['name'] = it.name
            map['color'] = it.color
            map['size'] = it.size
            map['description'] = it.description
            map['price'] = it.price
            map['last'] = it.last
            map['sellingPrice'] = it.sellingPrice
            map['wholesalePrice'] = it.wholesalePrice
            map['hasIncreasedPrice'] = it.hasIncreasedPrice
            map['photo_extension'] = it.photo_extension
            map['subCategory'] = it.subCategory
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(Storage) {
            def map = [:]
            map['id'] = it.id
            map['product'] = it.product
            map['stockNumber'] = it.stockNumber
            map['supplier'] = it.supplier
            map['quantity'] = it.quantity
            map['branch'] = it.branch
            map['unit'] = it.unit
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(PricelistTransaction) {
            def map = [:]
            map['id'] = it.id
            map['client'] = it.client
            map['branch'] = it.branch
            map['pricelistProducts'] = it.pricelistProducts
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(PricelistProduct) {
            def map = [:]
            map['id'] = it.id
            map['product'] = it.product
            map['price'] = it.price
            map['quantity'] = it.quantity
            map['unit'] = it.unit
            map['stockNumber'] = it.stockNumber
            map['transaction'] = it.transaction
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(PurchaseOrderTransaction) {
            def map = [:]
            map['id'] = it.id
            map['supplier'] = it.supplier
            map['shipVia'] = it.shipVia
            map['orderedProducts'] = it.orderedProducts
            map['notes'] = it.notes
            map['branch'] = it.branch
            map['dateOrdered'] = it.dateOrdered
            map['dateReceived'] = it.dateReceived
            map['dateToReceive'] = it.dateToReceive
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(PurchaseOrderProduct) {
            def map = [:]
            map['id'] = it.id
            map['product'] = it.product
            map['quantity'] = it.quantity
            map['unit'] = it.unit
            map['discount'] = it.discount
            map['stockNumber'] = it.stockNumber
            map['description'] = it.description
            map['unitPrice'] = it.unitPrice
            map['notes'] = it.notes
            map['stored'] = it.stored
            map['transaction'] = it.transaction
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(PurchaseOrderNote) {
            def map = [:]
            map['id'] = it.id
            map['note'] = it.note
            map['purchaseOrderTransaction'] = it.purchaseOrderTransaction
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(User) {
            def map = [:]
            map['id'] = it.id
            map['firstName'] = it.firstName
            map['lastName'] = it.lastName
            map['username'] = it.username
            map['requested_role'] = it.requested_role
            map['enabled'] = it.enabled
            map['password'] = it.password
            // map['dateCreated'] = it.dateCreated
            // map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(Role) {
            def map = [:]
            map['id'] = it.id
            map['authority'] = it.authority
            return map
        }
        JSON.registerObjectMarshaller(Notification) {
            def map = [:]
            map['id'] = it.id
            map['user'] = it.user
            map['branch'] = it.branch
            map['content'] = it.content
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(Employee) {
            def map = [:]
            map['id'] = it.id
            map['firstName'] = it.firstName
            map['middleName'] = it.middleName
            map['lastName'] = it.lastName
            map['contactNumber'] = it.contactNumber
            map['address'] = it.address
            map['birthdate'] = it.birthdate
            map['salaryRate'] = it.salaryRate
            map['branch'] = it.branch
            map['attendances'] = it.attendances
            map['dateCreated'] = it.dateCreated
            map['lastUpdated'] = it.lastUpdated
            return map
        }
        JSON.registerObjectMarshaller(Attendance) {
            def map = [:]
            map['id'] = it.id
            map['employee'] = it.employee
            map['date'] = it.date
            map['isPresent'] = it.isPresent
            map['isWholeDay'] = it.isWholeDay
            map['isPaymentReceived'] = it.isPaymentReceived
            // map['dateCreated'] = it.dateCreated
            // map['lastUpdated'] = it.lastUpdated
            return map
        }

        def cat1 = new Category(name: "kitchenware").save(flush: true)
        def cat2 = new Category(name: "school").save(flush: true)

        def sub1 = new SubCategory(name: "spoon", category: cat1).save(flush: true)
        def sub2 = new SubCategory(name: "uniform", category: cat2).save(flush: true)
        def sub3 = new SubCategory(name: "fork", category: cat1).save(flush: true)

        def type1 = new Type(name: "wooden").save(flush: true)
        def type2 = new Type(name: "steel").save(flush: true)

        def prod1 = new Product(name: "shoe", color: "blue", size: "big", description: "blue shoe", price: 50.0, subCategory: sub1, sellingPrice: 100, wholesalePrice: 110).save(flush: true)

        def prod2 = new Product(name: "shoess", color: "blue", size: "big", description: "blue shoe", price: 50.0, subCategory: sub2, sellingPrice:70, wholesalePrice:80).save(flush: true)

        //branch
        def branch1 = new Branch(name: "Aldeguer", address: "#9 Aldeguer St., Iloilo City", contactNumber: "(033) 337-78-81  (033) 335-10-72", faxNumber: "", email: "ibjcorp@yahoo.com").save(flush: true)
        def branch2 = new Branch(name: "Hoskyn", address: "Hoskyn's Compound Guanco St., Iloilo City", contactNumber: "(033) 337-32-31", faxNumber: "(033) 338-24-91").save(flush: true)
        def branch3 = new Branch(name: "Tanza", address: "Brgy. Tanza Baybay, Iloilo City", contactNumber: "(033) 337-01-62", faxNumber: "(033) 508-77-52").save(flush: true)

        //Pricelist
        def client1 = new Client(name: "Jepoy", contactNumber: "12345", address: "CPU").save(flush: true)

        def pricelist_trans1 = new PricelistTransaction(client: client1, branch: branch1).save(flush: true)

        def whole_prod1 = new PricelistProduct(product: prod1, price: 100.0, transaction: pricelist_trans1).save(flush: true)
        def whole_prod2 = new PricelistProduct(product: prod2, price: 150.0, transaction: pricelist_trans1).save(flush: true)


        //order
        def supplier1 = new Supplier(name: "Jigs", contactNumber: "54321", address: "CPU engg").save(flush: true)

        def ordered_trans1 = new PurchaseOrderTransaction(supplier: supplier1, shipVia: "boat", dateOrdered: new Date(), branch: branch1, dateToReceive: new Date()).save(flush: true)

        def ordered_prod1 = new PurchaseOrderProduct(product:
                new Product(name: "lotion", color: "white", size: "S", description: "white lotion", stock_number: "#000119*", price: 10.0, sellingPrice:20, wholesalePrice:30).save(flush: true),
                quantity: 5000, unit: "big box", unitQuantity: 2, unitPrice: 1000000, transaction: ordered_trans1).save(flush: true)

        def ordered_prod2 = new PurchaseOrderProduct(product:
                new Product(name: "laptop", color: "white", size: "M", description: "white laptop", stock_number: "#01100119*", price: 25000.0, sellingPrice:25010, wholesalePrice:26000).save(flush: true),
                quantity: 10, unit: "box", unitQuantity: 5, unitPrice: 250000, transaction: ordered_trans1).save(flush: true)

        //storage
        def store1 = new Storage(product: prod1, stockNumber: "123-32-12", supplier: supplier1, quantity: 100, branch: branch1, unit: "box").save(flush: true)
        def store2 = new Storage(product: prod2, stockNumber: "123-32-12", supplier: supplier1, quantity: 10, branch: branch1, unit: "piece").save(flush: true)
        def store3 = new Storage(product: 3, stockNumber: "123-32-12", supplier: supplier1, quantity: 10, branch: branch1, unit: "dozen").save(flush: true)
        def store4 = new Storage(product: 3, stockNumber: "123-32-12", supplier: supplier1, quantity: 10, branch: branch2, unit: "small box").save(flush: true)
        def store5 = new Storage(product: prod1, stockNumber: "123-32-12", supplier: supplier1, quantity: 10, branch: branch3, unit: "piece").save(flush: true)
        def store6 = new Storage(product: 4, stockNumber: "123-32-12", supplier: supplier1, quantity: 10, branch: branch3, unit: "box").save(flush: true)

        def nonUser = new Role(authority: 'NON_USER').save(flush: true)
        def adminUser = new Role(authority: 'ADMIN_USER', accessible_braches: [branch1, branch2, branch3]).save(flush: true)
        def aldeguerUser = new Role(authority: 'ALDEGUER_USER', accessible_braches: branch1).save(flush: true)
        def hoskynUser = new Role(authority: 'HOSKYN_USER', accessible_braches: branch2).save(flush: true)
        def tanzaUser = new Role(authority: 'TANZA_USER', accessible_braches: branch3).save(flush: true)

//        adminUser.addToAccesable_braches(branch1).save()
//        adminUser.addToAccesable_braches(branch2).save()
//        adminUser.addToAccesable_braches(branch3).save()
//
//        aldeguerUser.addToAccesable_braches(branch1).save()
//        hoskynUser.addToAccesable_braches(branch2).save()
//        tanzaUser.addToAccesable_braches(branch3).save()

        def admin = new User(contactNumber: "12321", gender: "male", birthDate: new Date(), firstName: "ad", lastName: "min", username: "admin", password: "1234").save(failOnError: true)
        def aUser = new User(contactNumber: "4444", gender: "female", birthDate: new Date(), firstName: "alde", lastName: "guer", username: "aldeguer", password: "1234").save(failOnError: true)
        def hUser = new User(contactNumber: "5555", gender: "male", birthDate: new Date(), firstName: "hos", lastName: "kyn", username: "hoskyn", password: "1234").save(failOnError: true)
        def nUser = new User(contactNumber: "6666", gender: "female", birthDate: new Date(), firstName: "non", lastName: "user", username: "aldeguer2", password: "1234", requested_role: 3).save(failOnError: true)

        def adminRole = Role.findByAuthority('ADMIN_USER')
        def aldeguerRole = Role.findByAuthority('ALDEGUER_USER')
        def hoskynRole = Role.findByAuthority('HOSKYN_USER')

        UserRole.create(admin, adminRole, true)
        UserRole.create(aUser, aldeguerRole, true)
        UserRole.create(hUser, hoskynRole, true)
        UserRole.create(nUser, nonUser, true)

        def employee1 = new Employee(firstName: "John1", middleName: "Poe1", lastName: "Doe1", contactNumber: "09123456789", address: "Aldeguer", birthdate: new Date().parse('yyyy/MM/dd HH:mm:ss', '1990/01/01 0:00:00'), salaryRate: 20, branch: branch1).save(flush: true)
        def employee2 = new Employee(firstName: "John2", middleName: "Poe1", lastName: "Doe2", contactNumber: "09123456789", address: "Lapit Aldeguer", birthdate: new Date().parse('yyyy/MM/dd HH:mm:ss', '1990/01/02 0:00:00'), salaryRate: 5.63, branch: branch1).save(flush: true)
        def employee3 = new Employee(firstName: "John3", middleName: "Poe1", lastName: "Doe3", contactNumber: "09123456789", address: "Near Hoskyn", birthdate: new Date().parse('yyyy/MM/dd HH:mm:ss', '1995/02/01 0:00:00'), salaryRate: 15.7, branch: branch2).save(flush: true)
        def employee4 = new Employee(firstName: "John4", middleName: "Poe1", lastName: "Doe4", contactNumber: "09123456789", address: "Tanze dapit", birthdate: new Date().parse('yyyy/MM/dd HH:mm:ss', '1989/01/01 0:00:00'), salaryRate: 55, branch: branch3).save(flush: true)

        def attendance1 = new Attendance(employee: employee1, date: new Date().parse('yyyy/MM/dd HH:mm:ss', '2016/03/06 0:00:00'), isPresent: true, isWholeDay: true).save(failOnError: true)
        def attendance2 = new Attendance(employee: employee1, date: new Date().parse('yyyy/MM/dd HH:mm:ss', '2016/03/07 00:00:00'), isPresent: true, isWholeDay: false).save(failOnError: true)
        def attendance3 = new Attendance(employee: employee1, date: new Date().parse('yyyy/MM/dd HH:mm:ss', '2016/03/08 00:00:00'), isPresent: false, isWholeDay: false).save(failOnError: true)
        def attendance4 = new Attendance(employee: employee1, date: new Date().parse('yyyy/MM/dd HH:mm:ss', '2016/03/09 00:00:00'), isPresent: true, isWholeDay: true).save(failOnError: true)
        def attendance5 = new Attendance(employee: employee1, date: new Date().parse('yyyy/MM/dd HH:mm:ss', '2016/03/10 00:00:00'), isPresent: true, isWholeDay: true).save(failOnError: true)
        def attendance6 = new Attendance(employee: employee1, date: new Date().parse('yyyy/MM/dd HH:mm:ss', '2016/03/11 00:00:00'), isPresent: true, isWholeDay: false).save(failOnError: true)
        def attendance7 = new Attendance(employee: employee1, date: new Date().parse('yyyy/MM/dd HH:mm:ss', '2016/03/12 00:00:00'), isPresent: false, isWholeDay: false).save(failOnError: true)
        def attendance8 = new Attendance(employee: employee1, date: new Date().parse('yyyy/MM/dd HH:mm:ss', '2016/03/13 00:00:00'), isPresent: true, isWholeDay: true).save(failOnError: true)
        def attendance9 = new Attendance(employee: employee1, date: new Date().parse('yyyy/MM/dd HH:mm:ss', '2016/03/14 00:00:00'), isPresent: true, isWholeDay: false).save(failOnError: true)
        def attendance10 = new Attendance(employee: employee2, date: new Date().parse('yyyy/MM/dd HH:mm:ss', '2016/03/14 00:00:00'), isPresent: true, isWholeDay: true).save(failOnError: true)
        def attendance11 = new Attendance(employee: employee2, date: new Date().parse('yyyy/MM/dd HH:mm:ss', '2016/03/15 00:00:00'), isPresent: true, isWholeDay: true).save(failOnError: true)

        def notification = new Notification(user: hUser, branch: branch2, content: "added 100(box) of lotion in the storage").save(flush: true)
        def notification2 = new Notification(user: aUser, branch: branch1, content: "added 100(pcs) of shoe in the storage").save(flush: true)
    }
    def destroy = {
    }
}
