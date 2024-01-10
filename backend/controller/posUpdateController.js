const asyncHandler =require('express-async-handler');
const mongoose = require('mongoose');
const Pos  =require('../models/posModels');


const updatePosorder =asyncHandler(async(req,res) =>{

    const { id } =req.params;

    try
    {
        const  {grandTotal,cart,vatAmount,total}  = req.body;

        // console.log(req.body);
        const existingEntry = await Pos.findById(id);
 
        const isModified = (
            req.body.cart !== existingEntry.cart ||
            req.body.grandTotal !== existingEntry.grandTotal ||
            req.body.vatAmount !== existingEntry.vatAmount ||
            req.body.total !== existingEntry.total
          );
          if (isModified) {
          const updatePos = await Pos.findByIdAndUpdate(id, {
            cart: req.body.cart,
            grandTotal: req.body.grandTotal,
            vatAmount: req.body.vatAmount,
            total: req.body.total,
          
          }, { new: true,upsert: true });

          console.log('Category updated:', updatePos);
          res.json({ modifiedData: updatePos });
        }

 
   
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
       
  });


  module.exports={updatePosorder}
  