const { json } = require('express');
var express = require('express');
var router = express.Router();
const productController = require('../../../commponent/product/ProductController');
const { checkTokenApp } = require('../../../MiddleWare/Authen')
const upLoadImage = require("../../../MiddleWare/UpLoadImage")
//http://localhost:3000/api/product/get-all
router.get('/get-all', [checkTokenApp], async (req, res, next) => {
    try {
        const products = await productController.getAllProduct();
        console.log(products)
        return res.status(200).json({ result: true, products: products });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ result: false, products: null })
    }
})
//http://localhost:3000/api/product/get-all-v2
router.get('/get-all-v2', [], async (req, res, next) => {
    try {
        const products = await productController.getAllProduct_2();
       // console.log(products)

        return res.status(200).json({ result: true, products: products });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ result: false, products: null })
    }
})
//http://localhost:3000/api/product/get-by-id?id=    
router.get('/get-by-id', async (req, res, next) => {
    try {
        const { id } = req.query;
        const products = await productController.getProductById(id);
        return res.status(200).json({ result: true, products: products });

    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({ result: false, product: null })
    }
})

//http://localhost:3000/api/product/search-by-name
router.get('/search-by-name', async (req, res, next) => {
    try {
        const { name } = req.query;
        const products = await productController.searchProductByName(name);
        return res.status(200).json({ result: true, products: products });

    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({ result: false, product: null })
    }
})
//http://localhost:3000/api/product/delete?id=
router.delete('/delete', async (req, res, next) => {
    try {
        const { id } = req.query;
        const products = await productController.deleteProductById(id);
        if (products) {
            return res.status(200).json({ result: true, products: products, message: "Delete Success" })

        } else {
            return res.status(400).json({ result: false, products: null, message: "ID products not exist" })
        }
    } catch (error) {
        console.log(error)

        return res.status(500).json({ result: false, product: null })
    }
})

//http://localhost:3000/api/product/update-product-by-id?id=
router.get('/update-product-by-id', [checkTokenApp], async (req, res, next) => {
    try {
        const { id } = req.query;//query input on path
        const { name, price, quantity, image, category } = req.body;//body input on panel
        const product = productController.updateProductById(id, name, price, quantity, image, category);
        console.log(product)
        if (id) {
            return res.status(200).json({ result: true, product: product, massage: "Update success" });
        } else {
            return res.status(400).json({ result: false, product: null, massage: "ID product doesn't exist" });
        }
    } catch (error) {
        console.log("update-product-by-id EROOR:" + error);
        return res.status(500).json({ result: false, product: null, massage: error })
    }
})

//http://localhost:3000/api/product/add-new
router.post('/add-new', [checkTokenApp, upLoadImage.single('image')], async (req, res, next) => {
    try {
        let { body, file } = req;

        if (file) {
            file = `http://172.16.64.67:3000/images/${file.filename}`;
            body = { ...body, image: file };
        }
        //const { id } = req.query;//query input on path
        const { name, price, quantity, image, category } = body;//body input on panel
        // const { name, price, quantity, image, category } = req.body;
        const product = await productController.addNewProduct(name, price, quantity, image, category);
        console.log(product)
        if (product) {
            return res.status(200).json({ result: true, product: product, massage: "Add new success" });

        } else {
            return res.status(400).json({ result: false, product: null, massage: "Failed to add new" });

        }
    } catch (error) {
        console.log("Add new product error:" + error);
        return res.status(500).json({ result: false, product: null, massage: "Failed to add new" })
    }
})

//API upload anh 
//http://localhost:3000/api/product/upload-image
router.post('/upload-image', [upLoadImage.single('image')], async (req, res, next) => {
    try {
        const { file } = req;
        if (file) {
            const link = `http://172.16.64.67:3000/images/${file.filename}`;
            return res.status(200).json({ result: true, link: link })
        }
        return res.status(400).json({ result: false, link: null })

    } catch (error) {
        console.log("Failed to updaload error:" + error);
        return res.status(500).json({ result: false, massage: "Failed to updaload" })
    }
})
//http://localhost:3000/api/product/upload-images
router.post('/upload-images', [upLoadImage.array('image', 2)], async (req, res, next) => {
    try {
        const { files } = req;
        console.log("file" + files);
        if (files && files.length > 0) {
            const links = [];
            for (let index = 0; index < files.length; index++) {
                const element = files[index];
               
                links.push(`http://172.16.64.67:3000/uploads/images${element.filename}`);
            }
            return res.status(200).json({ result: true, links: links })

        }
        // if (file) {
        //     const link = `http://172.16.64.67:3000/uploads/images/${file.filename}`;
        //     return res.status(200).json({ result: true, link: link })
        // }
        return res.status(400).json({ result: false, links: null })

    } catch (error) {
        console.log("Failed to updaload error:" + error);
        return res.status(500).json({ result: false, massage: "Failed to updaload" })
    }
})

module.exports = router;