var express = require('express');
var router = express.Router();
const categoryController = require('../../../commponent/category/CategoryController')
const productController = require('../../../commponent/product/ProductController')
const upLoadImage = require('../../../MiddleWare/UpLoadImage')
const { checkTokenCpanel } = require('../../../MiddleWare/Authen')

//http://localhost:3000/cpanel/product
//hien thi ds product
router.get('/', [checkTokenCpanel], async (req, res, next) => {
    const products = await productController.getAllProduct(1, 10);
    res.render('product/Table', { products });
})
//delete product
//http://localhost:3000/cpanel/product/:id/delete
router.post('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await productController.deleteProductById(id);
        res.json({ result })
    } catch (error) {
        res.json({ result: false });
    }

})
//http://localhost:3000/cpanel/product/new
router.get('/new', [checkTokenCpanel],async (req, res, next) => {
    try {
        const category = await categoryController.getCategories();
        return res.render('product/New', { category });
    } catch (e) {
        next(e)
    }

})
//xử lý thêm product
router.post('/new', [checkTokenCpanel,upLoadImage.single('image'),], async (req, res, next) => {
    try {
        //cmd, ipconfig,ipv4
        let { body, file } = req;
        if (file) {
            file = `http://172.16.64.67:3000/images/${file.filename}`;
            body = { ...body, image: file };
        }
        /**
         * 192.168.0.102
         * 172.16.64.67
         */
        const { name, price, quantity, category, image } = body;
        const result = await productController.addNewProduct(name, price, quantity, image, category);
        console.log("body prodcut" + body + "resu;t" + result);

        if (result) {
            return res.redirect('/cpanel/product')
        } else {
            return res.redirect('/cpanel/product/new')

        }
        
    } catch (error) {
        next(error);
    }
})

//http://localhost:3000/cpanel/product/1/edit
//hien thị trang thông tin chi tiết sản phẩm

router.get('/:id/edit',[checkTokenCpanel], async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productController.getProductById(id);
        let categories = await categoryController.getCategories();

        categories = categories.map(item => {
            item.selected = false;
            if (item._id.toString() == product.category.toString()) {
                item.selected = true;
            }
            return item;
        })

        console.log(product, categories);
        res.render('product/Edit', { product, categories });
    } catch (e) {
        next(e)
    }

})
//http://localhost:3000/cpanel/product/1/edit

//xử lý update product
router.post('/:id/edit', [checkTokenCpanel,upLoadImage.single('image'),], async (req, res, next) => {
    try {
        //cmd, ipconfig,ipv4
        let { body, file } = req;
        let { id } = req.params;
        if (file) {
            file = `http://172.16.64.67:3000/images/${file.filename}`;
            body = { ...body, image: file };
        }
         /**
         * 192.168.0.102
         * 172.16.64.67
         */
        const { name, price, quantity, category, image } = body;
        const result = await productController.updateProductById(id, name, price, quantity, image, category);
        console.log(result + "======================")

        if (result) {
            return res.redirect('/cpanel/product')
        } else {
            return res.redirect('/cpanel/product/${id}/edit')

        }
        
    } catch (error) {
        next(error);
    }
})

module.exports = router;