const asyncHandler =require('express-async-handler');
const Pos = require("../models/posModels");

const todayOrder =asyncHandler(async(req,res) =>{

    try {
        const today = new Date().toISOString().split('T')[0];
        
        const count = await Pos.countDocuments({
            date: { $gte: new Date(today), $lt: new Date(today + 'T23:59:59.999Z') },
            paymentstatus:"paid"
        });
    
        res.json({ count });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

const totalOrder =asyncHandler(async(req,res) =>{
    try {
        const count = await Pos.countDocuments(
          {
            paymentstatus:"paid"
          }
        );
        res.json({ count });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

const todaypaidsales = asyncHandler(async (req, res) => {
  try {
   
    const today = new Date().toISOString().split('T')[0];

    const matchCriteria = {
      date: { $gte: new Date(today), $lt: new Date(today + 'T23:59:59.999Z') },
      paymentstatus: 'paid',
    };

    const posinvoice = await Pos.aggregate([
      {
        $match: matchCriteria,
      },
      
    ]);

    res.json(posinvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  

module.exports ={todayOrder,totalOrder,todaypaidsales}