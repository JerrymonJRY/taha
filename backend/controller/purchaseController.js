const asyncHandler =require('express-async-handler');
const Purchase =require('../models/PurchaseModel');
const Supplier =require('../models/supplierModel');
const Ingredient =require('../models/ingredientsModel');

const getSupplier =asyncHandler(async (req,res) =>
{
    try {
        const getSupplier = await Supplier.find();
        res.json(getSupplier);
      } catch (error) {
        throw new Error(error);
      }

});


const getIngredient =asyncHandler(async(req,res) =>
{
    // try {
    //     const getIngredient = await Ingredient.find();
    //     res.json(getIngredient);
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    try {
      const ingredient = await Ingredient.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $unwind: '$category',
        },
        {
          $lookup: {
            from: 'ingredientunits',
            localField: 'unitId',
            foreignField: '_id',
            as: 'ingredientunit',
          },
        },
        {
          $unwind: '$ingredientunit',
        },
      ]);
    
      res.json(ingredient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }

});


const ctratePurchase =asyncHandler(async(req,res) =>{

  try{
    const {cart,paidAmount,dueAmount,grandTotal,supplierId,invoiceDate,suppliername}  =req.body;

    const sequence = await Purchase.findOne({}).sort('-invoicenumber');
    let nextIdNumber = 'Inv00001';
    if (sequence && sequence.invoicenumber) {
      const lastIdNumber = sequence.invoicenumber;
      const numericPart = lastIdNumber.substring(6);
      const nextNumericValue = parseInt(numericPart, 10) + 1;
      nextIdNumber = `Inv${nextNumericValue.toString().padStart(5, '0')}`;
    }
    const exists = await Purchase.findOne({ invoicenumber: nextIdNumber });
    if (exists) {
      return res.status(400).json({ error: 'ID number already exists' });
    }
   
      const newPurchase = new Purchase({ 
        invoicenumber: nextIdNumber,
        cart:cart,
        paidAmount:paidAmount,
        dueAmount:dueAmount,
        grandTotal:grandTotal,
        supplierId:supplierId,
        suppliername:suppliername,
        invoiceDate:invoiceDate,


        });
      // await newPurchase.save();
      const finaldata = await newPurchase.save();
      res.json(finaldata);
    }

  
  catch(error)
  {
    console.error(error);
  }
 
});

const allInvoice =asyncHandler(async(req,res) =>{

  try {

    const pos = await Purchase.aggregate([
      {
        $unwind: "$cart" // Flatten the cart array
      },
      {
        $lookup: {
          from: "ingredients",
          localField: "cart.ingredientId",
          foreignField: "_id",
          as: "menuItemDetails"
        }
      },
      {
        $unwind: "$menuItemDetails" // Unwind the menuItemDetails array
      },

      {
        $lookup: {
          from: "suppliers",
          localField: "supplierId",
          foreignField: "_id",
          as: "supplierDetails"
        }
      },
      {
        $unwind: {
          path: "$supplierDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        }
      },

      {
        $group: {
          _id: "$_id",
          invoicenumber:{$first: "$invoicenumber"},
          invoiceDate: { $first: "$invoiceDate" },
           grandTotal: { $first: "$grandTotal" },
          paidAmount: { $first: "$paidAmount" },
          dueAmount:{ $first:"$dueAmount"},
        
         
          cart: {
            $push: {
              ingredientId: "$cart.ingredientId",
              ingredientname: "$cart.ingredientname",
              quantity: "$cart.quantity",
              expirydate:"$cart.expirydate",
              total:"$cart.total",
              menuItemDetails: "$menuItemDetails"
            }
          },
          supplierDetails: { $first: "$supplierDetails" },

        

         

        }
      }
      
    ]);
  
    res.json(pos);
  } catch (error) {
    throw new Error(error);
  }
});


const editPurchase =asyncHandler(async(req,res) =>
{
  const { id } =req.params;
   
 
  try
  {
       const getpurchase =await Purchase.findById(id);
       res.json(getpurchase);
 
  }catch(error)
  {
   throw new Error(error);
  }
});


const expiryDate =asyncHandler(async(req,res) =>{

  try
  {
    const purchases = await Purchase.find(); // Assuming your model is named 'Purchase'

    const expiredItems = purchases
      .filter(purchase => purchase.cart.some(item => new Date(item.expirydate) <= new Date()))
      .map(purchase => ({
        invoiceNumber: purchase.invoicenumber,
        expiredItems: purchase.cart.filter(item => new Date(item.expirydate) <= new Date())
      }));

    res.json({ expiredItems });

  }
  catch(error)
  {
    console.error('Error checking expiry dates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})


module.exports ={getSupplier,getIngredient,ctratePurchase,allInvoice,editPurchase,expiryDate};