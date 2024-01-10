const mongoose = require('mongoose'); // Erase if already required
const bcrypt =require('bcrypt');
const crypto =require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    
        
    },
    lastname:{
        type:String,
        required:true,
    
    
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    designation:{
        type: mongoose.Schema.ObjectId,
        ref: "Designation",
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken: {
        type: String,
      },
      shifttoken:{
        type: String,
        
    },
  status: { type: String, default: 'Active' },
});

userSchema.pre("save",async function (next){

    if(!this.isModified("password"))
    {
        next();
    }

const salt=await bcrypt.genSaltSync(10);
this.password=await bcrypt.hash(this.password,salt);
});

userSchema.methods.isPasswordMatched= async function(enterpassword){
    return await bcrypt.compare(enterpassword,this.password)
}

//Export the model
module.exports = mongoose.model('User', userSchema);