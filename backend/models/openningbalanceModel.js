const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var openningBalanceSchema = new mongoose.Schema({
    openningbalancenumber: { type: String },
    addedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    amount: {
        type: String,
        required: true,
        unique: true,
      
    },
    shiftstoken:{
        type: String,
        
    },
     status: { type: String, default: 'Active' },
    date: { type: Date, default: Date.now },

});

// Export the model
module.exports = mongoose.model('Openningbalance', openningBalanceSchema);
