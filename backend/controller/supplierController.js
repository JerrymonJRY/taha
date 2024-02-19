const asyncHandler =require('express-async-handler');
const Supplier = require('../models/supplierModel');

const createSupplier =asyncHandler(async(req,res) =>{

    const suppliername =req.body.suppliername;
    const suppliermobile =req.body.suppliermobile;
    const taxnumber =req.body.taxtnumber;
    const findSupplier =await Supplier.findOne({ 
        suppliername:suppliername,
        suppliermobile:suppliermobile,
        taxnumber:taxnumber });
    if(!findSupplier)
    {
        //Create a new User
        const newTable =Supplier.create(req.body);
        res.json(newTable);
    }
    else{
       
        throw new Error("Supplier Details Already Exist");

    }

});

const viewSupplier =asyncHandler(async(req,res) =>
{
    try {
        const getSupplier = await Supplier.find();
        res.json(getSupplier);
      } catch (error) {
        throw new Error(error);
      }
});


const updateSupplier =asyncHandler(async(req,res) =>{

    const { id } =req.params;
    try
    {
        const updateSupplier =await Supplier.findByIdAndUpdate(id,{
            suppliername:req?.body?.suppliername,
            suppliermobile:req?.body?.suppliermobile,
            taxnumber:req?.body?.taxnumber,
            supplieremail:req?.body?.supplieremail,
            licensenumber:req?.body?.licensenumber,
            supplieraddress:req?.body?.supplieraddress

            
    
          },
          {
              new:true,
          }
          );
    
          res.json(updateSupplier);
    }catch(error)
    {
        throw new Error(error);
    }

});


const getSupplier =asyncHandler(async(req,res) =>{

    const { id } =req.params;
   
   //console.log(id);
   try
   {
        const getsupplier =await Supplier.findById(id);
        res.json(getsupplier);
  
   }catch(error)
   {
    throw new Error(error);
   }
  
  });

module.exports ={createSupplier,viewSupplier,updateSupplier,getSupplier};