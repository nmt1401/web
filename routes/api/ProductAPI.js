const express = require('express');
const router = express.Router();
const productController = require('../../src/Product/ProductController1');
const { checkTokenApp } = require('../../middle/Authen');
const upload = require('../../middle/UploadFile');

//http://localhost:3000/api/product/get-all
// api get all product  
router.get('/get-all', async (req, res, next) => {
    try {
        const products = await productController.getAllProduct();
        return res.status(200).json({ error: false, products: products });
    } catch (error) {
        return res.status(500).json({ error: true, products: null });
    }
});

//http://localhost:3000/api/product/get-by-id?id=
// api get product by id
router.get('/get-by-id', async (req, res, next) => {
    try {
        const { id } = req.query;
        const product = await productController.getProductById(id);
        return res.status(200).json({ error: false, product: product });
    } catch (error) {
        return res.status(500).json({ error: true, product: null });
    }
});
//http://localhost:3000/product/?name=
// api tim kiem san pham theo ten
router.get('', async (req, res, next) => {
    try {
        const { name } = req.query;
        const product = await productController.searchProductByName(name);
        return res.status(200).json({ error: false, product: product });
    } catch (error) {
        console.log('search product by name error', error);
        return res.status(500).json({ error: true, product: null });
    }
});
//http://localhost:3000/api/product/new
// api them moi san pham
router.post('/new', [checkTokenApp, upload.single('image')], async (req, res, next) => {
    try {
        let { body, file } = req;
        if (file) {
            namefile = file.filename;
            body = { ...body, image: namefile };
        }
        const { name, detail, emailContact, phoneNumber, image, category } = body;
        await productController.addNewProduct(name, detail, emailContact, phoneNumber, image, category);
        return res.status(200).json({ error: false, product: body, namefile });
    } catch (error) {
        console.log('add product by name error', error);
        return res.status(500).json({ error: true, product: null });
    }
});


module.exports = router;