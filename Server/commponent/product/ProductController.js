const productService = require('./ProductService');

const getAllProduct = async (page, size) => {
    try {
        return await productService.getAllProduct(page, size);
    } catch (error) {
        console.log("Got an error: " + error);
        throw error;
    }
}
const getAllProduct_2 = async (page, size) => {
    try {
        return await productService.getAllProduct(page, size);
    } catch (error) {
        console.log("Got an error: " + error);
        throw error;
    }
}
const deleteProductById = async (id) => {
    try {
        return await productService.deleteProductById(id);
    } catch (error) {
        return false;
    }
}
const addNewProduct = async (name, price, quantity, image, category) => {
    try {
        return await productService.addNewProduct(name, price, quantity, image, category);
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
const updateProductById = async (id, name, price, quantity, image, category) => {
    try {
        return await productService.updateProductById(id, name, price, quantity, image, category);
    } catch (error) {
        return false;
    }
}

const searchProductByName = async (name) => {
    try {
        return await productService.searchProductByName(name);
    } catch (error) {
        return false;
    }
}

module.exports = { getAllProduct, deleteProductById, addNewProduct, 
    getProductById, updateProductById, searchProductByName,getAllProduct_2 };




