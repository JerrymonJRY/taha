const asyncHandler =require('express-async-handler');
const Pos = require("../models/posModels");

const todayOrder =asyncHandler(async(req,res) =>{

    try {
        const today = new Date().toISOString().split('T')[0];
        
        const count = await Pos.countDocuments({
          paymentstatus: "paid",
            date: { $gte: new Date(today), $lt: new Date(today + 'T23:59:59.999Z') }
        });
    
        res.json({ count });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

const totalOrder =asyncHandler(async(req,res) =>{
    try {
        const count = await Pos.countDocuments();
        res.json({ count });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

const todaypaidsales = asyncHandler(async (req, res) => {
  try {
   
    const today = new Date().toISOString().split('T')[0];

   
    const result = await Pos.aggregate([
      {
        $match: {
          paymentstatus: "paid",
          date: { $gte: new Date(today), $lt: new Date(today + 'T23:59:59.999Z') }
        }
      },
      {
        $group: {
          _id: "$_id",
          grandTotal: { $sum: { $toDouble: "$grandTotal" } }
        }
      }
    ]).exec(); 

  //  console.log(result);

    let sum = 0;
    if (result.length > 0) {
      sum = result.reduce((acc, curr) => acc + curr.grandTotal, 0);
    }
    else{
      sum = 0;
    }

  
    res.json({ sum });
  } catch (err) {
    // Handle any errors
    console.error('Error executing query', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const oveallsales =asyncHandler(async(req,res) =>{

  try {
   
  

   
    const result = await Pos.aggregate([
      {
        $match: {
          paymentstatus: "paid",
          
        }
      },
      {
        $group: {
          _id: "$_id",
          grandTotal: { $sum: { $toDouble: "$grandTotal" } }
        }
      }
    ]).exec(); 

   // console.log(result);

    let sum = 0; // Change const to let

    if (result.length > 0) {
      sum = result.reduce((acc, curr) => acc + curr.grandTotal, 0);
    } else {
      sum = 0;
    }

  
    res.json({ sum });
  } catch (err) {
    // Handle any errors
    console.error('Error executing query', err);
    res.status(500).json({ error: 'An error occurred' });
  }

});



module.exports ={todayOrder,totalOrder,todaypaidsales,oveallsales}