var express = require('express');
var router = express.Router();
const { checkTokenApp } = require('../../../MiddleWare/Authen')
const categoryController = require('../../../commponent/category/CategoryController');
//http://localhost:3000/api/category/get-all-category
router.get('/get-all-category', async (req, res, next) => {
    try {
        const categories = await categoryController.getCategories();
        console.log(categories)
        return res.status(200).json({ result: true, categories: categories });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ result: false, categories: null })
    }
})
//http://localhost:3000/api/category/add-new-category
router.get('/add-new-category', [checkTokenApp], async (req, res, next) => {
    try {
        const { name } = req.body;
        console.log(name)

        const categories = categoryController.addNewCategory(name);
        console.log(categories)
        if (categories) {
            return res.status(200).json({ result: true, categories: categories, massage: "Add new success" });

        } else {
            return res.status(400).json({ result: false, categories: categories, massage: "Failed to add new" });

        }
        
    } catch (error) {
        console.log("Error get all category " + error);
        return res.status(500).json({ result: false, categories: null })
    }
})

//http://localhost:3000/api/category/delete-category-by-name
router.get('/delete-category-by-name', [checkTokenApp], async (req, res, next) => {
    try {
        const { name } = req.body;
        console.log(name)

        const categories = categoryController.deleteCategoryByName(name);
        console.log(categories)
        if (categories) {
            return res.status(200).json({ result: true, categories: categories, massage: "Delete category success" });

        } else {
            return res.status(400).json({ result: false, categories: categories, massage: "Failed to Delete category" });

        }
        
    } catch (error) {
        console.log("Error get all category " + error);
        return res.status(500).json({ result: false, categories: null })
    }
})
//http://localhost:3000/api/category/update-category-by-name?nameUpdate=
router.get('/update-category-by-name', [checkTokenApp], async (req, res, next) => {
    try {
        const { nameUpdate } = req.query;
        const { name } = req.body;
        console.log(name)

        const categories = categoryController.updateCategoryByName(nameUpdate,name);
        console.log(categories)
        if (categories) {
            return res.status(200).json({ result: true, categories: categories, massage: "Update category success" });

        } else {
            return res.status(400).json({ result: false, categories: categories, massage: "Failed to Update category" });

        }
        
    } catch (error) {
        console.log("Error get all category " + error);
        return res.status(500).json({ result: false, categories: null })
    }
})
module.exports = router;