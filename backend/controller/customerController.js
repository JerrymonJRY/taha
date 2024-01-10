const asyncHandler =require('express-async-handler');
const Customer =require('../models/customerModel');

const createCustomer =asyncHandler(async(req,res) =>{

    const customermobile =req.body.customermobile;
    const findCustomer =await Customer.findOne({ customermobile:customermobile });
    if(!findCustomer)
    {
        //Create a new User
        const newCustomer =Customer.create(req.body);
        res.json(newCustomer);
    }
    else{
       
        throw new Error("Customer Details Already Exist");

    }
});


const getallCustomer = asyncHandler(async (req, res) => {
    try {
      const getCustomer = await Customer.find();
      res.json(getCustomer);
    } catch (error) {
      throw new Error(error);
    }
  });


  const getCustomer =asyncHandler(async(req,res) =>{

    const { id } =req.params;
   
   //console.log(id);
   try
   {
        const getCust =await Customer.findById(id);
        res.json(getCust);
  
   }catch(error)
   {
    throw new Error(error);
   }
  
  });

  const updateCustomer =asyncHandler(async(req,res)=>{
     
    const { id } =req.params;
   
    try
    {
        const updateCustomer =await Customer.findByIdAndUpdate(id,{
          customername:req?.body?.customername,
          customeremail:req?.body?.customeremail,
          customermobile:req?.body?.customermobile,
          customeraddress:req?.body?.customeraddress,
          
  
        },
        {
            new:true,
        }
        );
  
        res.json(updateCustomer);
    }
    catch(error)
    {
        throw new Error(error);
    }
  
  
  });


  const deleteCustomer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // validateMongoDbId(id);
  
    try {
      const deleteCustomer = await Customer.findByIdAndDelete(id);
      res.json({
        deleteCustomer,
      });
    } catch (error) {
      throw new Error(error);
    }
  });


module.exports = {createCustomer,getallCustomer,getCustomer,updateCustomer,deleteCustomer};