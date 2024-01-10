const asyncHandler =require('express-async-handler');
const Cashdrop =require('../models/cashdropModel');
const Transaction =require('../models/acctransactionModel');


const createCash =asyncHandler(async(req,res) =>{

    const {amount,dropout,notes,addedby,shiftstoken} = req.body;
  // console.log(req.body);
  try
  {
    const cashdropout = new Cashdrop({
        amount:amount,
        dropout:dropout,
        notes:notes,
        addedby:addedby,
        shiftstoken:shiftstoken,
       
      
    });

    const finaldata = await cashdropout.save();

    if(dropout ==='Out')
    {
      const sequence = await Transaction.findOne({}).sort('-transnumber');
      
      let nextIdNumber = 'TR10001';

      if (sequence && sequence.transnumber) {
        
        const lastIdNumber = sequence.transnumber;
        const numericPart = lastIdNumber.substring(2); 
        const nextNumericValue = parseInt(numericPart, 10) + 1; 
        nextIdNumber = `TR${nextNumericValue.toString().padStart(5, '0')}`; 
      }

      const exists = await Transaction.findOne({ transnumber: nextIdNumber });

      if (exists) {
        return res.status(400).json({ error: 'ID number already exists' });
      }
      let transtype ="Debit";

      const newEntry = new Transaction({ 
        accountsid:finaldata._id,
        transnumber:nextIdNumber,
        transmode:dropout,
        amount:amount,
        transtype:transtype,
        shiftstoken:shiftstoken,


  
  
       
      
      });
      await newEntry.save();


    }
    else if (dropout === 'Drop') {
      const sequence = await Transaction.findOne({}).sort('-transnumber');
      let nextIdNumber = 'TR10001';

      if (sequence && sequence.transnumber) {
        const lastIdNumber = sequence.transnumber;
        const numericPart = lastIdNumber.substring(2);
        const nextNumericValue = parseInt(numericPart, 10) + 1;
        nextIdNumber = `TR${nextNumericValue.toString().padStart(5, '0')}`;
      }

      const exists = await Transaction.findOne({ transnumber: nextIdNumber });

      if (exists) {
        return res.status(400).json({ error: 'ID number already exists' });
      }

      transtype = 'Credit';
    

    const newEntry = new Transaction({
      accountsid: finaldata._id,
      transnumber: nextIdNumber,
      transmode: dropout,
      amount: amount,
      transtype: transtype,
      shiftstoken:shiftstoken,
    });

    await newEntry.save();

  }
    

    res.json(finaldata);
  }
  catch (error) {
    res.status(401).json({status:401,error})
}
})


const getCashdrop =asyncHandler(async(req,res) =>{

  try
  {
    const today = new Date();
     today.setHours(0, 0, 0, 0);

     const cashdrops = await Cashdrop.find({
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    });

    res.json(cashdrops);

  }
  catch (error) {
    console.error('Error fetching "notpaid" orders:', error);
  
  }

})

module.exports ={createCash,getCashdrop}