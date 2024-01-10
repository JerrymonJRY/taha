const asyncHandler =require('express-async-handler');
const Expenseinvoice =require('../models/expenseinvoiceModel');
const Expense =require('../models/expenseModel')
const Transaction =require('../models/acctransactionModel');

const User =require('../models/userModel');


const getexpensecategory =asyncHandler(async (req,res) =>{
    try {
        const getexpense = await Expense.find();
        res.json(getexpense);
      } catch (error) {
        throw new Error(error);
      }

});

const createinvexpense =asyncHandler(async(req,res) =>{

    const {expenseId,amount,date,addedby} = req.body;
    try{

        const expenseinv = new Expenseinvoice({
            expenseId:expenseId,
            amount:amount,
            date:date,
            addedby:addedby,
           
          
        });
    
        const finaldata = await expenseinv.save();

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
        let transmode ="Expense";
  
        const newEntry = new Transaction({ 
          accountsid:finaldata._id,
          transnumber:nextIdNumber,
          transmode:transmode,
          amount:amount,
          transtype:transtype
  
  
    
    
         
        
        });
        await newEntry.save();

        res.json(finaldata);

    }
    catch(error)
    {
        res.status(401).json({status:401,error})
    }

});


const viewexpenseinvoivce =asyncHandler(async(req,res) =>{

    try {
        const viewexpense = await Expenseinvoice.aggregate([

            {
                $match: {
                  status: "Active"
                }
              },
        
          {
            $lookup: {
              from: 'expenses',
              localField: 'expenseId',
              foreignField: '_id',
              as: 'expense',
            },
          },
          {
            $unwind: '$expense',
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
        ]);
      
        res.json(viewexpense);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }

});

const editexpenseinvoice =asyncHandler(async(req,res) =>{
    const { id } =req.params;

     //console.log(id);
 try
 {
      const getexpense =await Expenseinvoice.findById(id);
      res.json(getexpense);

 }catch(error)
 {
  throw new Error(error);
 }
});

const updateExpenseinvoice =asyncHandler(async(req,res) =>{
    const { id } =req.params;

    const {expenseId,amount,date,addedby} = req.body;
    try
    {
        const updateExpense =await Expenseinvoice.findByIdAndUpdate(id,{
            expenseId:req?.body?.expenseId,
            amount:req?.body?.amount,
            date:req?.body?.date,
            addedby:req?.body?.addedby,
          
  
        },
        {
            new:true,
        }
        );
        
        const updatedId = updateExpense._id;

        const transactionEntry = await Transaction.findOne({ accountsid: updatedId });

        if(transactionEntry)
        {
            const updateTrans =await Transaction.findByIdAndUpdate(transactionEntry._id,{
              
                amount:req?.body?.amount,
              
            },
            {
                new:true,
            }
            );

        }

       
  
        


  
        res.json(updateExpense);
    }
    catch(error)
    {
        throw new Error(error);
    }
});


const deleteExpenseinvoice =asyncHandler(async(req,res) =>{
  const { id } =req.params;
  try {
    const updateExpense = await Expenseinvoice.findByIdAndUpdate(
      id,
      {
        status: "InActive", 
      },
      {
        new: true,
      }
    );

    res.json(updateExpense);
  }
  catch(error)
  {
    throw new Error(error);
  }
})



module.exports ={getexpensecategory,createinvexpense,viewexpenseinvoivce,editexpenseinvoice,updateExpenseinvoice,deleteExpenseinvoice}