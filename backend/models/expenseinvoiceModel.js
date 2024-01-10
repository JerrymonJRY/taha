const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var expenseinvoiceSchema = new mongoose.Schema({
    expenseId:{
        type: mongoose.Schema.ObjectId,
        ref: "Expense",
    },
    amount:{
        type:String,
        required:true,
       
    },
    addedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
   
  
    date: { type: Date },
    createdate: { type: Date, default: Date.now },
    status: { type: String, default: 'Active' },
 
});

//Export the model
module.exports = mongoose.model('ExpenseInvoice', expenseinvoiceSchema);