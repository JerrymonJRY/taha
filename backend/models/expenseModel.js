const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var expenseSchema = new mongoose.Schema({
    expensename:{
        type:String,
        required:true,
     
    },

    addedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
  
});

//Export the model
module.exports = mongoose.model('Expense', expenseSchema);