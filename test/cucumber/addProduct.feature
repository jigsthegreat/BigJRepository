Feature: Add product

  Scenario: Product form all filled up
  Given I am logged in
  When I press the add product button
  And I am redirected to the add product page
  And I fill in the form with Item name "Item 1", Description "Desc", Stock Number: "1212", Color: "Blue", Size: "L", Price "2323"
  Then I can see the new product added into the products page