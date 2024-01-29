const asyncHandler = require("express-async-handler");
const { ObjectId } = require('mongodb');
const Cashdrop =require('../models/cashdropModel');
const Balance =require('../models/openningbalanceModel');
const User =require('../models/userModel');
const Cancelorder =require('../models/cancelOrderModel');
const Pos =require('../models/posModels');
const mongoose = require('mongoose');
const closingbalance = asyncHandler(async (req, res) => {
  const addedbyParam = req.query.addedby;
  const today = new Date().toISOString().split('T')[0];
  try {
    // Log the parameter value if needed
    console.log(addedbyParam);

    if (!mongoose.Types.ObjectId.isValid(addedbyParam)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    const result = await Balance.aggregate([
      {
        $match: {
          addedby: new mongoose.Types.ObjectId(addedbyParam),
          date: { $gte: new Date(today), $lt: new Date(today + 'T23:59:59.999Z') },
          status: 'Active' // Match documents with status 'Active'
        }
      },
      {
        $lookup: {
          from: 'payments',
          localField: 'addedby',
          foreignField: 'addedby',
          as: 'payments'
        }
      },
      {
        $lookup: {
          from: 'cashdrops',
          localField: 'addedby',
          foreignField: 'addedby',
          as: 'cashdrops'
        }
      },
      
    ]);

    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



const closeShift = asyncHandler(async (req, res) => {
  const shiftAccessParam = req.query.shiftaccess;

  try {
    // Validate the ObjectId (if needed)
    // if (!mongoose.Types.ObjectId.isValid(addedbyParam)) {
    //   return res.status(400).json({ error: 'Invalid ObjectId' });
    // }

    console.log('Shift Access:', shiftAccessParam);

    // Update the opening balance status to 'Closed'
    const updatedOpeningBalance = await Balance.findOneAndUpdate(
      { shiftacess: shiftAccessParam },
      { $set: { status: 'Closed' } },
      { new: true }
    );

    // Check if the opening balance was found and updated
    if (!updatedOpeningBalance) {
      return res.status(404).json({ error: 'Opening balance not found or not updated' });
    }

    // Send the updated opening balance as JSON response
    res.json(updatedOpeningBalance);
  } catch (error) {
    console.error('Error closing shift:', error);

    // Respond with an error status and details
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});



const getShiftAccess = asyncHandler(async (req, res) => {
  const id = req.query.id;

  // Check if storeid is not valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid storeid' });
  }

  // Use return statements after sending responses
  User.findOne({ _id: id })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      console.log(user);
      return res.json(user);
    })
    .catch(error => {
      console.error('Error finding user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    });
});


const closingCancelOrder =asyncHandler(async(req,res) =>{

  const addedbyParam = req.query.addedby;
  const today = new Date().toISOString().split('T')[0];
  try {
    // Log the parameter value if needed
    console.log(addedbyParam);

    if (!mongoose.Types.ObjectId.isValid(addedbyParam)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }
    
    const result = await Balance.aggregate([
      {
        $match: {
          addedby: new mongoose.Types.ObjectId(addedbyParam),
          date: { $gte: new Date(today), $lt: new Date(today + 'T23:59:59.999Z') },
          status: 'Active' // Match documents with status 'Active'
        }
      },
      {
        $lookup: {
          from: 'payments',
          localField: 'addedby',
          foreignField: 'addedby',
          as: 'payments'
        }
      },
      {
        $lookup: {
          from: 'cancelorders',
          localField: 'addedby',
          foreignField: 'addedby',
          as: 'cancelorders'
        }
      },

      


      
      
    ]);

    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal Server Error' });
  }


});


const posclosingbalance =asyncHandler(async(req,res) =>{

  const addedbyParam = req.query.addedby;
  const today = new Date().toISOString().split('T')[0];

  try {

    console.log(addedbyParam);

    if (!mongoose.Types.ObjectId.isValid(addedbyParam)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }


   
    const matchCriteria = {
      addedby: new mongoose.Types.ObjectId(addedbyParam),
      date: { $gte: new Date(today), $lt: new Date(today + 'T23:59:59.999Z') },
      status: 'Active' // Match documents with status 'Active'
      };
  
     
    const posinvoice = await Balance.aggregate([
        {
            $match: matchCriteria,
          },

     
      {
        $lookup: {
          from: 'payments',
          localField: 'addedby',
          foreignField: 'addedby',
          as: 'payments',
        },
      },
      {
        $unwind: '$payments',
      },

      {
        $lookup: {
          from: 'users',
          localField: 'addedby',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },

      {
        $lookup: {
          from: 'users',
          localField: 'cancelBy',
          foreignField: '_id',
          as: 'cancels',
        },
      },
      {
        $unwind: '$cancels',
      },


      

    ]);
    res.json(posinvoice);
   

   
  } catch (error) {
    console.error('Error fetching "notpaid" orders:', error);
  
  }



});








module.exports ={closingbalance,closeShift,getShiftAccess,closingCancelOrder,posclosingbalance}