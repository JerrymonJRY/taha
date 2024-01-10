const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cashdropSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  dropout: {
    type: String,
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
  date: { type: Date, default: Date.now },
});

//Export the model
module.exports = mongoose.model("Cashdrop", cashdropSchema);
