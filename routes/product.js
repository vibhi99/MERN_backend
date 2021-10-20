const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductController')
//const AuthController = require('../controllers/AuthController')
//const {authenticate, restrictTO} = require('../middleware/authenticate')
const upload = require('../middleware/upload')

router.get('/', //authenticate,
        //restrictTO('admin'),
        ProductController.index)
        
router.post('/show', //authenticate, 
    ProductController.show)

router.post('/store', upload.single('photo'), //authenticate,
    ProductController.store)

router.post('/update', //authenticate, 
    ProductController.update)

router.post('/delete', //authenticate, 
    ProductController.destroy)

module.exports = router