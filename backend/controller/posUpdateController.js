const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Pos = require('../models/posModels');

const updatePosorder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Destructure the request body for clarity
    const { grandTotal, cart, vatAmount, total } = req.body;

    // Check if the existing entry with the given id exists
    const existingEntry = await Pos.findById(id);

    // If the entry doesn't exist, return a 404 error
    if (!existingEntry) {
      return res.status(404).json({ error: 'POS order not found' });
    }

    // Check if any of the properties are modified
    const isModified =
      cart !== existingEntry.cart ||
      grandTotal !== existingEntry.grandTotal ||
      vatAmount !== existingEntry.vatAmount ||
      total !== existingEntry.total;

    // If any property is modified, update the POS order
    if (isModified) {
      const updatedPos = await Pos.findByIdAndUpdate(
        id,
        {
          cart,
          grandTotal,
          vatAmount,
          total,
        },
        { new: true, upsert: true }
      );

      // Log and return the updated POS order
      console.log('POS order updated:', updatedPos);
     // return res.json({ modifiedData: updatedPos });
    }

    // If nothing is modified, return the existing data
    res.json({ existingData: existingEntry });
  } catch (error) {
    // Log the error and return a 500 status with an error message
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

  