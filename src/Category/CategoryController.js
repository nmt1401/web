const e = require('express');
const categoriesService = require('./CategoryServices');

const getCategories = async () =>{
    try {
        return await categoriesService.getCategories();
    } catch (error) {
        console.log(error);
    }
}
module.exports={getCategories};