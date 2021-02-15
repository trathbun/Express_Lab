const express = require('express');
const cartItems = express.Router();

//logic for our endpoints

const cartItemsArray = [
    {"id":2, "product": "Stuffed Animal", "price": 10, "quantity": 1},
    {"id":4, "product": "Peanut Butter", "price": 4, "quantity": 2},
    {"id":6, "product": "Book", "price": 20, "quantity": 1},
    {"id":8, "product": "Fruit", "price": 3, "quantity": 5},
    {"id":10, "product": "Veggies", "price": 4, "quantity": 4}
];

//done except prefix
cartItems.get('/', (req, res) => {

    const maxPrice = req.query.maxPrice;
    const prefix = req.query.prefix;
    const pageSize = req.query.pageSize;


    if(maxPrice){

        const max = cartItemsArray.filter((item)=>{
            return item.price <= maxPrice;
        });
        res.json(max);

    }else if(prefix){

        //still broke!
        const searchTerm = cartItemsArray.filter((item) =>{
            return item.product.filter(prefix);
        });
        res.json(searchTerm);

    }else if(pageSize){

        const pageLimit = cartItemsArray.slice(0, pageSize);
        res.json(pageLimit);

    }else{

        res.json(cartItemsArray);
    }

     res.status(200);
    // res.json(cartItemsArray);
})

//done
cartItems.get('/:id', (req, res) => {
    
    const id = parseInt(req.params.id);
  
    const items = cartItemsArray.filter( (item) => { 
        return item.id === id;
    });

    if(items.length > 0){
        res.status(200);
        res.json(items);
    }else{
        res.status(404).send('ID Not Found');
    }
})

//done
cartItems.post("/", (req, res) => {

    let addItem = req.body;
    addItem.id = cartItemsArray.length;
    addItem.product = req.body.product;
    addItem.price = req.body.price;
    addItem.quantity = req.body.quantity;
    cartItemsArray.push(addItem);
    res.status(201);
    res.json(addItem);
   
  });

//done
cartItems.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = cartItemsArray.findIndex((item) => { 
        return item.id === id;
    });

    const updateItem = cartItemsArray[index];

    updateItem.product = req.body.product;
    updateItem.price = req.body.price;
    updateItem.quantity = req.body.quantity;

    res.status(200);
    res.json(updateItem);
  });

//done
cartItems.delete("/:id", (req, res) => { 

    const deleteIndex = cartItemsArray.findIndex((item) =>{
        return item.id === parseInt(req.params.id);
    });

    cartItemsArray.splice(deleteIndex,1);
    res.status(204);
    res.json();
  });


module.exports = cartItems;