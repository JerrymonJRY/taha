const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
  }
};

module.exports = dbConnect;
