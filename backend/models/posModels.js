const mongoose = require('mongoose'); // Erase if already required
const validObjectId = new mongoose.Types.ObjectId();
// Declare the Schema of the Mongo model
var posSchema = new mongoose.Schema({
ordernumber:{type:String},
  customers: {
    type: mongoose.Schema.ObjectId,
       ref: "Customer",
       default: null,
   },
  options:{type:String},

  // cart: {
  //   type: Array,
  //   default: [],
  // },
  cart:[{
    foodmenuId: { type: mongoose.Schema.ObjectId,
      ref: "FoodMenu",},
    foodmenuname:String,
    salesprice: String,
    quantity: String,

  }] 
    
  ,
  total:{type:String},
  grandTotal:{type:String},
  vatAmount:{type:String},
  tableId:{
    type: mongoose.Schema.ObjectId,
       ref: "Table",
       default: null,
  },
  waiterId:{
    type: mongoose.Schema.ObjectId,
       ref: "Waiter",
  },
  delivery:{
    type: mongoose.Schema.ObjectId,
    ref: "Delivery",
    default: null,
  },
  date: { type: Date, default: Date.now },
  paymentstatus:{
    type: String,
    default: null,
  },
  hold:{
    type:String,
    default:null,
  },
  paymentType:
  {
    type:String,
    default:null,
  },
  addedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  opentoken:{type:String},
  billnumber:{type:String,default:null,},
  cancelBy:{
    type: mongoose.Schema.ObjectId,
       ref: "User",
       default: null
  },





},{ timestamps: true });

//Export the model
module.exports = mongoose.model('Pos', posSchema);