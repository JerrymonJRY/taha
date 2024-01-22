const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var acctransactionSchema = new mongoose.Schema({
  acccode: {
    type: String,
  },
  accountsid: {
    type: String,
  },
  transnumber: {
    type: String,
  },
  transmode: {
    type: String,
  },
  amount: {
    type: String,
  },
  transtype: {
    type: String,
  },
  shiftstoken: {
    type: String,
  },
  transtatus:{
    type: String,
    default: null,
  },
  date: { type: Date, default: Date.now },
});

//Export the model
module.exports = mongoose.model("Acctransaction", acctransactionSchema);
