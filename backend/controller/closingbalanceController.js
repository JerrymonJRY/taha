const asyncHandler = require("express-async-handler");
const { ObjectId } = require('mongodb');
const Cashdrop =require('../models/cashdropModel');
const Balance =require('../models/openningbalanceModel');
const User =require('../models/userModel');
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
      }
    ]);

    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




const closeShift = asyncHandler(async (req, res) => {
  const addedbyParam = req.query.addedby;

  try {
    if (!mongoose.Types.ObjectId.isValid(addedbyParam)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    const updatedOpeningBalance = await Balance.findOneAndUpdate(
      { addedby: addedbyParam },
      { $set: { status: 'Closed' } },
      { new: true }
    );

    if (!updatedOpeningBalance) {
      return res.status(404).json({ error: 'Opening balance not found' });
    }

    res.json(updatedOpeningBalance);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes

    // You might want to include more details in the response for development purposes
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







module.exports ={closingbalance,closeShift,getShiftAccess} 