const productService = require('./ProductServices');
const getAllProduct = async (page,size) => {
    try {
        //return await productService.getAllProduct(page,size);
        return await productService.getAllProduct_V2(page,size);
    } catch (error) {
        throw error;
    }

}
const deleteProductById = async (id) => {
    try {
        return await productService.deleteProductById(id);
    } catch (error) {
        throw error;
    }

}

const addNewProduct = async (name, detail, emailContact,phoneNumber, image, category) => {
    try {
        return await productService.addNewProduct(name, detail, emailContact,phoneNumber, image, category);
    } catch (error) {
        return false;
    }
}

const getProductById = async (id) => {
    try {
        return await productService.getProductById(id);
    } catch (error) {
        return null;
    }
}

const updateProductById = async (id, name, detail, emailContact,phoneNumber, image, category) => {
    try {
        return await productService.updateProductById(id, name, detail, emailContact,phoneNumber, image, category);
    } catch (error) {
        return false;
    }
}
const searchProductByName = async (name) => {
    try {
        return await productService.searchProductByName(name);
    } catch (error) {
       console.log('search producy by name error',error);
    }
    return null;
}
module.exports = {
    getAllProduct,
    deleteProductById,
    addNewProduct,
    getProductById
    , updateProductById
    , searchProductByName
    
};