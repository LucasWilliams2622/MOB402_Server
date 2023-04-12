
const CategoryModel = require('./CategoryModel');

// getCategories
const getAllCategory = async () => {
    try {

        // return data;
        return await CategoryModel.find(    ); // equl select * from
    } catch (e) {
        throw (console.log(e));
    }
}
const addNewCategory = async (name) => {
    try {

        const category = await CategoryModel.findOne({ name: name });

        if (category) {
            return false;
        } else {
            const newCategory = { name }
            const p = new CategoryModel(newCategory);
            await p.save();
            return true;
        }
    } catch (e) {
        console.log("EROOR add new" + e);
        return false
    }
}


const deleteCategoryByName = async (name) => {
    try {
        const category = await CategoryModel.findOne({ name: name })
        console.log(category)
        {
            await CategoryModel.deleteOne(category)
        }
        return true;
    } catch (error) {
        console.log("Delete category  error" + error);
        return false;

    }
}

const updateCategoryByName = async (nameUpdate, name) => {
    try {
        //check email toon tại hay chua
        //selecct * form categorys where email = email;
        const category = await CategoryModel.findOne({ name: nameUpdate })
        if (category) {
            category.name = name ? name : category.name;
            await category.save();
            console.log("category:" + category);

            return true;
        } else {

            return false;
        }
    } catch (error) {
        console.log("Update category  error" + error)
        return false;

    }
}
module.exports = { getAllCategory, addNewCategory, deleteCategoryByName, updateCategoryByName }

var data =
    [{
        "_id": 1,
        "name": "Ely"
    }, {
        "_id": 2,
        "name": "Justine"
    }, {
        "_id": 3,
        "name": "Abagail"
    }, {
        "_id": 4,
        "name": "Tillie"
    }, {
        "_id": 5,
        "name": "Sheila"
    }, {
        "_id": 6,
        "name": "Kenon"
    }, {
        "_id": 7,
        "name": "Isaak"
    }, {
        "_id": 8,
        "name": "Joye"
    }, {
        "_id": 9,
        "name": "Layton"
    }, {
        "_id": 10,
        "name": "Friedrick"
    }]