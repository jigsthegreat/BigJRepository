package test

import geb.Page

class ProductPage extends Page{
    static url="http://localhost:8080/BigJRepository/#/products"

    static content={
        addproductbtn{
            $("button[name=addProduct]")
        }
    }

    static at = {
        waitFor {
            title == /http:\/\/localhost:8080\/BigJRepository\/products#\/products/
        }
    }

    def toAddProductPage () {
        waitFor{
            addproductbtn.click ()
        }
    }
}