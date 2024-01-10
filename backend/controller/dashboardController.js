const asyncHandler =require('express-async-handler');
const Pos = require("../models/posModels");

const todayOrder =asyncHandler(async(req,res) =>{

    try {
        const today = new Date().toISOString().split('T')[0];
        
        const count = await Pos.countDocuments({
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

const todaynotpaidsales = asyncHandler(async (req, res) => {
    try {
      // Fetch grandTotal values from the "Pos" collection
      const grandTotals = await Pos.find();
  
      // Calculate the sum of the "grandTotal" field
      const sum = grandTotals.reduce((acc, pos) => acc + pos.grandTotal, 0);
  
      // Split the digits and calculate their sum
      const digitSum = String(sum).split('').map(Number).reduce((a, b) => a + b, 0);
  
      res.json({ sum: digitSum });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports ={todayOrder,totalOrder,todaynotpaidsales}