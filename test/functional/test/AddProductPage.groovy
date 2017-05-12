package test

import geb.Page

class AddProductPage extends Page{
    static url="http://localhost:8090/BigJRepository/#/add-product"

    static content = {
        save {
            $ ('button[name=save]')
        }
    }

    static at = {
        waitFor {
            title == /http:\/\/localhost:8080\/BigJRepository\/products#\/add-product/
        }
    }


    def add (String itemName, String description, String stockNumber, String color, String size, String price){
        $("form").inputItemName = itemName
        $("form").inputDescription = description
        $("form").inputStockNumber = stockNumber
        $("form").inputColor = color
        $("form").inputSize = size
        $("form").inputPrice = price

        save.click ()
    }

}