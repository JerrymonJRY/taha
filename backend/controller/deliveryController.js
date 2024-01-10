const asyncHandler =require('express-async-handler');
const Delivery =require('../models/deliveryModel');

const createDelivery =asyncHandler(async(req,res) =>{

    const deliverymobile =req.body.deliverymobile;
    const findDelivery =await Delivery.findOne({ deliverymobile:deliverymobile });
    if(!findDelivery)
    {
        //Create a new User
        const newDel =Delivery.create(req.body);
        res.json(newDel);
    }
    else{
       
        throw new Error("Delivery Person Mobile Number  Already Exist");

    }

});

const getallDelivery = asyncHandler(async (req, res) => {
    try {
      const getDel = await Delivery.find();
      res.json(getDel);
    } catch (error) {
      throw new Error(error);
    }
  });


  const getWaiter =asyncHandler(async(req,res) =>{

    const { id } =req.params;
   
   //console.log(id);
   try
   {
        const getcat =await Delivery.findById(id);
        res.json(getcat);
  
   }catch(error)
   {
    throw new Error(error);
   }
  
  });

 



module.exports = {createDelivery,getallDelivery};