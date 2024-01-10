const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var invpurchaseSchema = new mongoose.Schema({
 invoicenumber:{type:String,
    },
 cart:[{
    ingredientId: { type: mongoose.Schema.ObjectId,
      ref: "Ingredient"},
    ingredientname:String,
    purchaseprice:Number,
    quantity: Number,
    expirydate: String,
    total:Number,
    unit:String,

  }],
  paidAmount:{
        type:String,
       
    },
    dueAmount:{type:String},
    grandTotal:{
        type:String,
        
    },
    supplierId:{
        type: mongoose.Schema.ObjectId,
       
        ref: "Supplier",
    },
    suppliername:{type:String},
    invoiceDate:{type:String},
});

//Export the model
module.exports = mongoose.model('InvPurchase', invpurchaseSchema);