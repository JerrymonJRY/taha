const asyncHandler =require('express-async-handler');
const Waiter =require('../models/waiterModel');

const createWaiter =asyncHandler(async(req,res) =>{

    const mobile =req.body.mobile;
    const findWaiter =await Waiter.findOne({ mobile:mobile });
    if(!findWaiter)
    {
        //Create a new User
        const newVat =Waiter.create(req.body);
        res.json(newVat);
    }
    else{
       
        throw new Error("Category Already Exist");

    }

});

const getallWaiter = asyncHandler(async (req, res) => {
    try {
      const getVat = await Waiter.find();
      res.json(getVat);
    } catch (error) {
      throw new Error(error);
    }
  });


  const getWaiter =asyncHandler(async(req,res) =>{

    const { id } =req.params;
   
   //console.log(id);
   try
   {
        const getcat =await Waiter.findById(id);
        res.json(getcat);
  
   }catch(error)
   {
    throw new Error(error);
   }
  
  });

  const updateWaiter =asyncHandler(async(req,res)=>{
     
    const { id } =req.params;
   
    try
    {
        const updateUser =await Waiter.findByIdAndUpdate(id,{
          waitername:req?.body?.waitername,
          designation:req?.body?.designation,
          mobile:req?.body?.mobile,
          description:req?.body?.description,
          
  
        },
        {
            new:true,
        }
        );
  
        res.json(updateUser);
    }
    catch(error)
    {
        throw new Error(error);
    }
  
  
  });


  const deleteWaiter = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // validateMongoDbId(id);
  
    try {
      const deleteCategory = await Waiter.findByIdAndDelete(id);
      res.json({
        deleteCategory,
      });
    } catch (error) {
      throw new Error(error);
    }
  });



module.exports = {createWaiter,getallWaiter,getWaiter,updateWaiter,deleteWaiter};