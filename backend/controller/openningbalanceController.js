const asyncHandler =require('express-async-handler');
const Balance =require('../models/openningbalanceModel')
const Transaction =require('../models/acctransactionModel');

const createBalance = asyncHandler(async (req, res) => {
  const { amount,addedby,shiftstoken } = req.body;

  try {
   
    const latestBalance = await Balance.findOne({}).sort('-openningbalancenumber');
    let nextIdNumber = 'OB10001';

    if (latestBalance && latestBalance.openningbalancenumber) {
      const lastIdNumber = latestBalance.openningbalancenumber;
      const numericPart = lastIdNumber.substring(2);
      const nextNumericValue = parseInt(numericPart, 10) + 1;
      nextIdNumber = `OB${nextNumericValue.toString().padStart(5, '0')}`;
    }

   
    const exists = await Balance.findOne({ openningbalancenumber: nextIdNumber });

    if (exists) {
      return res.status(400).json({ error: 'ID number already exists' });
    }

  
    const newEntry = new Balance({
      openningbalancenumber: nextIdNumber,
      amount: amount,
      addedby:addedby,
      shiftstoken:shiftstoken,
    });

    
    const savedEntry = await newEntry.save();

    const sequence = await Transaction.findOne({}).sort('-transnumber');
      
        let newTransNumber = 'TR10001';
  
        if (sequence && sequence.transnumber) {
          
          const lastIdNumber = sequence.transnumber;
          const numericPart = lastIdNumber.substring(2); 
          const nextNumericValue = parseInt(numericPart, 10) + 1; 
          newTransNumber = `TR${nextNumericValue.toString().padStart(5, '0')}`; 
        }
  
        const exist = await Transaction.findOne({ transnumber: newTransNumber });
  
        if (exists) {
          return res.status(400).json({ error: 'ID number already exists' });
        }
        let transtype ="Debit";
        let transmode ="Openning Balance";
  
        const newTransaction = new Transaction({ 
          accountsid:savedEntry._id,
          transnumber:newTransNumber,
          transmode:transmode,
          amount:amount,
          transtype:transtype,
          shiftstoken:shiftstoken
  
  
    
    
         
        
        });
        await newTransaction.save();



   
    res.json(savedEntry);
  } catch (error) {
    console.error('Error completing opening balance:', error);

    // Handle specific Mongoose duplicate key error
    if (error.code === 11000 && error.keyPattern && error.keyPattern.openningbalancenumber) {
      return res.status(400).json({ error: 'ID number already exists' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const checkBalance = asyncHandler(async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
  
    try {
      // const result = await Balance.findOne({
      //   date: { $gte: new Date(today), $lt: new Date(today + 'T23:59:59.999Z') },
      // });
      const result = await Balance.findOne({
        date: { $gte: new Date(today), $lt: new Date(today + 'T23:59:59.999Z') },
        status: "Active",
      });
  
      if (result) {
        res.json({ hasOpeningBalance: true, openingBalance: result });
      } else {
        res.json({ hasOpeningBalance: false });
      }
    } catch (error) {
      console.error('Error checking opening balance:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports={createBalance,checkBalance}