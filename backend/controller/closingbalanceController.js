const asyncHandler = require("express-async-handler");

const Cashdrop =require('../models/cashdropModel');
const Balance =require('../models/openningbalanceModel')
const closingbalance = asyncHandler(async (req, res) => {
  try {
    const shiftstokenParam = req.query.shiftstoken;

    const result = await Balance.aggregate([
      {
        $match: { shiftstoken: shiftstokenParam }
      },
      {
        $lookup: {
          from: 'payments',
          localField: 'shiftstoken',
          foreignField: 'shiftstoken',
          as: 'payments'
        }
      },
      {
        $lookup: {
          from: 'cashdrops',
          localField: 'shiftstoken',
          foreignField: 'shiftstoken',
          as: 'cashdrops'
        }
      }
    ]);

   

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const closeShift =asyncHandler(async(req,res) =>{
  try {
    const shiftstokenParam = req.query.shiftstoken;

   
    const updatedOpeningBalance = await Balance.findOneAndUpdate(
      { shiftstoken: shiftstokenParam },
      { $set: { status: 'Closed' } }, // Update the status to 'Closed'
      { new: true } // Return the updated document
    );

    if (!updatedOpeningBalance) {
      return res.status(404).json({ error: 'Opening balance not found' });
    }

    res.json(updatedOpeningBalance);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


module.exports ={closingbalance,closeShift} 