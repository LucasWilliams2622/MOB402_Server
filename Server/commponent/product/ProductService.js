const ProductModel = require('./ProductModel')


//get list product  in db
//base 1 ->20
const getAllProduct = async (page, size) => {
    let skip = (page - 1) * size;
    let limit = (size);
    try {
        // return data;
        return await ProductModel.find({}, 'name price category quantity image')
            .populate('category', 'name')
            .sort({ name: 1 })
            .skip(0)
            .limit(10)

            ;//get name and price in db
        //  data.splice(index, 1);

    } catch (error) {
        console.log("Got an error: " + error);
        throw error;
    }
}

//delete product by id
const deleteProductById = async (id) => {
    try {
        // const index = data.findIndex(item => item._id.toString() == id.toString());
        // if (index >= 0) {
        //     data.splice(index, 1);
        // }
        // return true;
        await ProductModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log("Delete product Got an error: ", error);

        return false;
    }
}

const addNewProduct = async (name, price, quantity, image, category) => {
    try {
        // const newProduct = {
        //     _id: data.length + 1,
        //     name,
        //     price,
        //     quantity,
        //     image,
        //     category,  
        // }
        // data.push(newProduct)

        //selecct * form users where email = email;
        const product = await ProductModel.findOne({ name: name })
        console.log("product:" + product);
        if (product) {
            return false;
        } else {
            const newProduct = { name, price, quantity, image, category }
            const p = new ProductModel(newProduct);
            await p.save();
            return true;
        }

    } catch (e) {
        console.log("EROOR add new" + e);
        return false
    }
}

//get product by id
const getProductById = async (id) => {
    try {
        // const product = data.find(item => item._id.toString() == id.toString());
        // if (product) {
        //     return product;
        // }
        // return null;
        return await ProductModel.findById(id);
    } catch (error) {
        console.log('Get products by id error', error);
        return null;
    }
}
// cập nhật product by id
const updateProductById = async (id, name, price, quantity, image, category) => {
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
        //     return true
        // }
        // return false;

        const product = await ProductModel.findById(id);
        if (product) {
            product.name = name ? name : product.name;
            product.price = price ? price : product.price;
            product.quantity = quantity ? quantity : product.quantity;
            product.image = image ? image : product.image;
            product.category = category ? category : product.category;
            await product.save();
            return true;
        }
    } catch (error) {
        console.log("Update product by id error: ", error);
        return false;
    }
}
// looking product by name
const searchProductByName = async (name) => {
    try {
        return await ProductModel.find({
            name: { $regex: name, $options: 'i' }
            // ,price: { $gte: 10, $lte: 100 },
            // quantity:{$or:[{ $gt:10 },{$lt:5}]}
        })
    }

    catch (error) {
        console.log("Search product by id error: ", error);
        return false;
    }
}

module.exports = {
    getAllProduct, deleteProductById,
    addNewProduct, getProductById, updateProductById, searchProductByName
};


var data =

    [{
        "_id": 1,
        "name": "Bernhard-Morar",
        "price": 38,
        "quantity": 68,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 7
    }, {
        "_id": 2,
        "name": "Wolf-Baumbach",
        "price": 39,
        "quantity": 89,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 5
    }, {
        "_id": 3,
        "name": "Homenick, McGlynn and Runte",
        "price": 85,
        "quantity": 33,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 6
    }, {
        "_id": 4,
        "name": "Satterfield, Koelpin and Ratke",
        "price": 4,
        "quantity": 37,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 10
    }, {
        "_id": 5,
        "name": "Parker, Windler and Raynor",
        "price": 46,
        "quantity": 68,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 9
    }, {
        "_id": 6,
        "name": "Brakus-Grant",
        "price": 66,
        "quantity": 5,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 5
    }, {
        "_id": 7,
        "name": "Gerlach, Hane and Koch",
        "price": 24,
        "quantity": 60,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 7
    }, {
        "_id": 8,
        "name": "Barton-Leffler",
        "price": 18,
        "quantity": 69,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 3
    }, {
        "_id": 9,
        "name": "Turner-Davis",
        "price": 56,
        "quantity": 4,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 3
    }, {
        "_id": 10,
        "name": "Harris, Wisoky and Roberts",
        "price": 78,
        "quantity": 41,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 6
    }, {
        "_id": 11,
        "name": "Champlin-Crona",
        "price": 19,
        "quantity": 59,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 8
    }, {
        "_id": 12,
        "name": "VonRueden Inc",
        "price": 78,
        "quantity": 81,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 4
    }, {
        "_id": 13,
        "name": "Heaney LLC",
        "price": 39,
        "quantity": 96,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 2
    }, {
        "_id": 14,
        "name": "Block, Grady and Schuster",
        "price": 12,
        "quantity": 68,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 7
    }, {
        "_id": 15,
        "name": "Kohler and Sons",
        "price": 100,
        "quantity": 1,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 9
    }, {
        "_id": 16,
        "name": "Haley LLC",
        "price": 17,
        "quantity": 81,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 1
    }, {
        "_id": 17,
        "name": "Spinka Group",
        "price": 15,
        "quantity": 25,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 10
    }, {
        "_id": 18,
        "name": "Gerhold-Terry",
        "price": 85,
        "quantity": 94,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 2
    }, {
        "_id": 19,
        "name": "Mitchell and Sons",
        "price": 100,
        "quantity": 12,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 5
    }, {
        "_id": 20,
        "name": "Heathcote, Swaniawski and Langworth",
        "price": 86,
        "quantity": 87,
        "image": "https://khamphahanhtrinhnovaland.com.vn/wp-content/uploads/2020/04/Nhung-hinh-anh-nuoc-Nga-khong-the-bo-lo-khi-di-du-lich.jpg",
        "category": 7
    }]
