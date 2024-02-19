const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Pos = require('../models/posModels');

const updatePosorder =asyncHandler(async(req,res) =>{

  const { id } =req.params;

  try
  {
      const  {grandTotal,cart,vatAmount,total}  = req.body;

      // console.log(req.body);

      // const existingEntry = await Pos.findById(id);
      // const existingCart = existingEntry.cart;
      
      // existingCart.forEach(existingItem => {
      //     const { foodmenuId: existingFoodmenuId, foodmenuname: existingFoodmenuname, salesprice: existingSalesprice, quantity: existingQuantity } = existingItem;
      
      //     cart.forEach(updatedItem => {
      //         const { foodmenuId: updatedFoodmenuId, foodmenuname: updatedFoodmenuname, salesprice: updatedSalesprice, quantity: updatedQuantity } = updatedItem;
      
      //         if (existingFoodmenuId.toString() === updatedFoodmenuId.toString()) {
      //             // Subtract the quantities if foodmenuId values match
      //             const parsedUpdatedQuantity = parseInt(updatedQuantity);
      //             const parsedExistingQuantity = parseInt(existingQuantity);
      //             const difference = parsedUpdatedQuantity - parsedExistingQuantity;
      //             console.log(`Difference for foodmenuId ${existingFoodmenuname}: ${difference}`);
      //         }
      //     });
      // });
      const existingEntry = await Pos.findById(id);
      const existingCart = existingEntry.cart;
      
      const differences = [];
      
      cart.forEach(updatedItem => {
          const { foodmenuId: updatedFoodmenuId, foodmenuname: updatedFoodmenuname, salesprice: updatedSalesprice, quantity: updatedQuantity } = updatedItem;
      
          const existingItem = existingCart.find(item => item.foodmenuId.toString() === updatedFoodmenuId.toString());
      
          if (existingItem) {
              const { foodmenuId: existingFoodmenuId,foodmenuname:existingfoodname, quantity: existingQuantity,salesprice:existingsalesprice } = existingItem;
      
              // Subtract the quantities if foodmenuId values match
              const parsedUpdatedQuantity = parseInt(updatedQuantity);
              const parsedExistingQuantity = parseInt(existingQuantity);
              const difference = parsedUpdatedQuantity - parsedExistingQuantity;
              differences.push({ foodmenuname: existingfoodname, quantity:difference,salesprice:existingsalesprice });
          } else {
              // Handle new items from the cart
              differences.push({ foodmenuname: updatedFoodmenuname,quantity:updatedQuantity,salesprice:updatedSalesprice, isNew: true });
          }
      });


      
      
     

      //console.log(differences);
      

      

 
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

       // console.log('Category updated:', updatePos);
      // res.json({ modifiedData: updatePos });

      res.json({ differences,updatePos });
      }


 
  }
  catch(error)
  {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
     
});



const lastupdated =asyncHandler(async(req,res) =>{
  try {
    const lastUpdatedData = await Pos.find().sort({ updatedAt: -1 }).limit(1);
    res.json(lastUpdatedData[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = { updatePosorder,lastupdated };

  