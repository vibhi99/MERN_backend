const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductController')
const AuthController = require('../controllers/AuthController')
const {authenticate, restrictTO} = require('../middleware/authenticate')
const upload = require('../middleware/upload')

router.get('/',
    ProductController.index)
        
router.post('/show',
    ProductController.show)

router.post('/store', upload.single('photo'), 
    authenticate, restrictTO('admin'),
    ProductController.store)

router.post('/update', 
    authenticate, restrictTO('admin'),
    ProductController.update)

router.post('/delete', 
    authenticate, restrictTO('admin'),
    ProductController.destroy)

module.exports = router