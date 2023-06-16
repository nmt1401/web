const express = require('express');
const router = express.Router();
const productController = require('../../src/Product/ProductController1');
const categoryController=require('../../src/Category/CategoryController')
const {checkTokenCpanel}=require('../../middle/Authen');
const uploadFile = require('../../middle/UploadFile');

//http://localhost:3000/cpanel/product
// hien thi trang danh sach san pham
router.get('/', async (req, res, next) => {
    const product = await productController.getAllProduct();
    res.render('product/sanpham', { product });
});
//http://localhost:3000/cpanel/product/:id/delete
//xoa san pham theo id
router.post('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        await productController.deleteProductById(id);
        return res.json({ status: true });
    } catch (error) {
        return res.json({ status: false });
    }

});

//http://localhost:3000/cpanel/product/new
//hien thi form them san pham
router.get('/new',async(req,res,next)=>{
    try {
        const categories = await categoryController.getCategories();
        return res.render('product/themmoi',{categories});
    } catch (error) {
        console.log(error);
    }
   
});
//http://localhost:3000/cpanel/product/new
//xu li them san pham
router.post('/new',[ uploadFile.single('image'),],async(req,res,next)=>{
    try {

        let {body,file} = req;
        if(file){
            file =`http://192.168.135.164:3000/images/${file.filename}`;
            body={...body,image:file};
        }
        const{name,detail,emailContact,phoneNumber,image,category}=body;
        const result = await productController.addNewProduct(name,detail,emailContact,phoneNumber, image,category);
        
        if(result){
           return res.redirect('/cpanel/product');
        }else{
            return res.redirect('/cpanel/product/new');
        }
    } catch (error) {
        next(error);
    }
   
});
//http://localhost:3000/cpanel/product/:id/edit
// hien thi trang thong tin chi tiet san pham
router.get('/:id/edit', async (req, res, next) => {
    try {
        const {id}=req.params;
        const product=await productController.getProductById(id);
        let categories=await categoryController.getCategories();
        categories = categories.map(item=>{
            item.selected=false;
            if(item._id==product.category){
                item.selected=true;
            }
            return item;
        })
        return res.render('product/sua',{product,categories});
    } catch (error) {
        next(error);
    }
});
//http://localhost:3000/cpanel/product/:id/edit
//xu li cap nhat san pham
router.post('/:id/edit',[ uploadFile.single('image'),],async(req,res,next)=>{
    try {
        let {id}=req.params;
        let {body,file} = req;
        if(file){
            file =`http://192.168.1.9:3000/images/${file.filename}`;
            body={...body,image:file};
        }
        const{name,detail,emailContact,phoneNumber,image,category}=body;
        const result = await productController.updateProductById(id,name,detail,emailContact,phoneNumber,image,category);
       
        if(result){
           return res.redirect('/cpanel/product');
        }else{
            return res.redirect(`/cpanel/product/${id}/edit`);
        }
    } catch (error) {
        next(error);
    }
   
});

module.exports = router;