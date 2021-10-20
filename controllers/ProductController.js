const Product = require('../models/Product')

//Show the list of Employee
const index = (req, res, next)=>{
    if(req.query.page && req.query.limit){
        Product.paginate({}, {page: req.query.page, limit: req.query.limit})
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error Occurred!' + error
                })
            })
    }
    else{
        Product.find()
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error Occurred!'
                })
            })
    }
    

    
}

//Show single employee
const show = (req, res, next) => {
    let productID = req.body.productID
    Product.findById(productID)
    .then(response => {
        res.json({
            response
        })
        .catch(error =>{
            res.json({
                message: 'An error Occured!'
            })
        })
    })
}

//Add a new Employee
const store = (req, res, next) =>{
    let product = new Product({
        prodname: req.body.prodname,
        description: req.body.description,
        price: req.body.price
    })
    if(req.file){
        product.photo = req.file.path
    }
    product.save()

    .then(response =>{
        res.json({
            message: 'Product Added Successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error Occured while adding!'
        })
    })
}

//Update an employee

const update = (req, res, next) =>{
    let productID = req.body.productID

    let updateData = {
        prodname: req.body.prodname,
        description: req.body.description,
        price: req.body.price,
        photo: req.body.photo
    }

    Product.findByIdAndUpdate(productID, {$set: updateData})
    .then(response =>{
        res.json({
            message: 'Product Updated Successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occurred while updating!'
        })
    })
}

// Delete an employee

const destroy = (req, res, next) =>{
    let productID = req.body.productID
    Product.findByIdAndRemove(productID)
    .then(response => {
        res.json({
            message: 'Product Deleted Succesfully!'
        })
    })
    .then(error =>{
        res.json({
            message: 'An error occurred while deleting!'
        })
    })
}


module.exports = {
    index, show, store, update, destroy
}