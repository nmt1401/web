const productModel = require('./ProductModel');

// lay toan bo san pham trong database
const getAllProduct = async () => {
    try {
        // return data;
        return await productModel.find(); // select * from products
    } catch (error) {
        throw error;
    }

}
// lay toan bo san pham trong database
const getAllProduct_V2 = async (page, size) => {
    //Đây là phân trang
    let skip = (page - 1) * size; // công thức tính
    let limit = size;
    try {
        // return data;
        return await productModel.find({}).exec()
        // //select name, price, category from products
        // .find({}, 'name detail emailContact phoneNumber image category ') // chỉ lấy 2 trường name và price
        // .populate('category', 'name') //lấy thông tin category
        // .sort({ price: 1 }) // sắp xếp theo giá tăng dần
        // .skip(0)//bỏ qua bao nhiêu sản phẩm
        // .limit(100)// giới hạn số lượng sản phẩm


    } catch (error) {
        throw error;
    }

}
// xoa san pham theo id
const deleteProductById = async (id) => {
    try {
        // const index = data.findIndex(item => item._id.toString() == id.toString());
        // if (index >= 0) {
        //     data.splice(index, 1);
        //     return true;
        // }
        //return false
        await productModel.findByIdAndDelete(id);// mongodb
        return true;
    } catch (error) {
        console.log('Delete product by Id error:', error);
        throw error;
        return false;
    }

}
// them moi san pham vao database
const addNewProduct = async (name, detail, emailContact, phoneNumber) => {
    try {
        // const newProduct = {
        //     _id: data.length + 1,
        //     name,
        //     price,
        //     quantity,
        //     image,
        //     category
        // }
        // data.push(newProduct);
        const newProduct = {
            name, detail, emailContact, phoneNumber
        }
        const p = new productModel(newProduct);
        await p.save();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
//lay thong tin 1 san pham theo id
const getProductById = async (id) => {
    try {
        // const product = data.find(item => item._id.toString() == id.toString());
        // if (product) {
        //     return product;
        // }
        // return null;
        return await productModel.findById(id).populate('category', 'name');//mongodb
    } catch (error) {
        console.log('>>> Error:', error);
        return null;
    }
}
//cap nhat san pham theo id
const updateProductById = async (id, name, detail, emailContact, phoneNumber, image, category) => {
    try {
        // const product = data.find(item => item._id.toString() == id.toString());
        // if (product) {
        //     data = data.map(item => {
        //         if (item._id.toString() == id.toString()) {
        //             item.name = name ? name : item.name;
        //             item.price = price ? price : item.price;
        //             item.quantity = quantity ? quantity : item.quantity;
        //             item.image = image ? image : item.image;
        //             item.category = category ? category : item.category;

        //         }
        //         return item;
        //     });
        //     return true;
        // }
        // return false;
        const product = await productModel.findById(id);
        if (product) {
            product.name = name ? name : product.name;
            product.detail = detail ? detail : product.detail;
            product.emailContact = emailContact ? emailContact : product.emailContact;
            product.phoneNumber = phoneNumber ? phoneNumber : product.phoneNumber;
            product.image = image ? image : product.image;
            product.category = category ? category : product.category;
            await product.save();
            return true;

        }
        return false;

    } catch (error) {
        console.log('>>> uopdate error', error);
        return false;
    }
}
//tim kiem san pham theo ten
const searchProductByName = async (name) => {
    try {
        //tên có biểu thức chính quy ... không phân biệt chữ hoa thường
        return await productModel.find({
            name: { $regex: name, $options: 'i' },
            // quantity:{$gt:10},  //số lượng lớn hơn 10
            $or: [{ quantity: { $lt: 5 } }, { quantity: { $gt: 50 } }],//số lượng nhỏ hơn 5 hoặc lớn hơn 50
            //search giá tiền lớn hơn 10 và nhỏ hơn 100
            price: { $gte: 10, $lte: 100 }//greater than or equal 10, less than or equal 100
        });
        // giá tiền nằm trong khoảng từ 10 --> 100

    } catch (error) {
        console.log('Search Error', error);
    }
    return null;
}
module.exports = {
    getAllProduct,
    deleteProductById,
    addNewProduct,
    getProductById,
    updateProductById,
    searchProductByName,
    getAllProduct_V2
};
