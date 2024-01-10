const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var foodmenuSchema = new mongoose.Schema({
    foodmenuname: {
        type: String,
        index: { unique: true, partialFilterExpression: { foodmenuname: { $type: 'string' } } },
        default: null,
    },
    foodcategoryId: {

        type: mongoose.Schema.ObjectId,

        ref: "Foodcategory", default: null,


    },

    foodingredientId: {
        type: [String],
        default: null,
    },

    salesprice: {
        type: String, default: null,

    },
    vatId: {
        type: mongoose.Schema.ObjectId,
        ref: "Vat",
    },
    description:
    {
        type: String, default: null,

    },
    vegitem: {
        type: String, default: null,
    },
    beverage: {
        type: String, default: null,
    },
    bar: {
        type: String, default: null,
    },
    photo: {
        type: String, default: null,

    }

});

//Export the model
module.exports = mongoose.model('Foodmenu', foodmenuSchema);