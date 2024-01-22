const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cancelorderSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pos",
  },
  cancelBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  notes: {
    type: String,
  },
  addedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  shiftstoken: {
    type: String,
  },
  opentoken: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

//Export the model
module.exports = mongoose.model("Cancelorder", cancelorderSchema);
