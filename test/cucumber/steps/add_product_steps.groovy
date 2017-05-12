import static cucumber.api.groovy.EN.*
import test.ProductPage
import test.AddProductPage


Given(~/^I am logged in$/) { ->
    // Write code here that turns the phrase above into concrete actions
    to ProductPage
}
When(~/^I press the add product button$/) { ->
    // Write code here that turns the phrase above into concrete actions
    at ProductPage
    page.toAddProductPage ()
}
When(~/^I am redirected to the add product page$/) { ->
    // Write code here that turns the phrase above into concrete actions
    at AddProductPage
}
When(~/^I fill in the form with Item name "([^"]*)", Description "([^"]*)", Stock Number: "([^"]*)", Color: "([^"]*)", Size: "([^"]*)", Price "([^"]*)"$/) { String itemName, String description, String stockNumber, String color, String size, String price ->
    // Write code here that turns the phrase above into concrete actions
    page.add(itemName, description, stockNumber,color,size,price)

}
Then(~/^I can see the new product added into the products page$/) { ->
    // Write code here that turns the phrase above into concrete actions
    to ProductPage
}