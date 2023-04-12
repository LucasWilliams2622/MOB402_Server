const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    image: { type: String },
    category: { type: ObjectId, ref: 'category' },//khoa ngoai


});

module.exports = mongoose.models.product || mongoose.model('product', productSchema);
//trong đây là số ít bên mông là số nhiều