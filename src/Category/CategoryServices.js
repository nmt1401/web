const categoryModel=require('./CategoryModel');

const getCategories = async () => {
    try {
        //return data;
        return await categoryModel.find(); // dong nghia voi select * from categories
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getCategories };
