const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var paymentSchema = new mongoose.Schema({
    bilnumber:{type:String},
    orderId:{
        type: mongoose.Schema.ObjectId,
           ref: "Pos",
        
       },
       total:{type:String},
       grandTotal:{type:String},
       vatAmount:{type:String},
       paymentType:
  {
    type:String,
    default:null,
  },
  addedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  shiftstoken:{
    type: String,
    
},

    date: { type: Date, default: Date.now },
 
});

//Export the model
module.exports = mongoose.model('Payment', paymentSchema);