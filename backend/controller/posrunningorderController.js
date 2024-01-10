const asyncHandler =require('express-async-handler');
const mongoose = require('mongoose');
const foodcategory =require('../models/foodcategoryModel');
const Waiter =require('../models/waiterModel');
const Table =require('../models/tableModel');
const Customer =require('../models/customerModel');
const Foodmenu =require('../models/foodmenuModel');
const Pos  =require('../models/posModels');
const Delivery =require('../models/deliveryModel');
const OrderTable =require('../models/ordertableModel');
const Payment =require('../models/paymentModel');
const Transaction =require('../models/acctransactionModel')


const runningOrder =asyncHandler(async(req,res) =>{

    try {
      const runningorder = await Pos.aggregate([
        {
          $match: {
            paymentstatus: "notpaid"
          }
        },
  
        {
          $lookup: {
            from: 'tables',
            localField: 'tableId',
            foreignField: '_id',
            as: 'table',
          },
        },
        {
          //$unwind: '$table',
          $unwind: {
            path: "$table",
            preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
          }
        },
        {
          $lookup: {
            from: 'waiters',
            localField: 'waiterId',
            foreignField: '_id',
            as: 'waiter',
          },
        },
        {
          $unwind: '$waiter',
        },
        
  
      ]);
      res.json(runningorder);
      // Use Mongoose to find orders where paymentstatus is "notpaid"
     // const notPaidOrders = await Pos.find({ paymentstatus: 'notpaid' });
  
     // res.json(notPaidOrders);
    } catch (error) {
      console.error('Error fetching "notpaid" orders:', error);
    
    }
  
  })


  const getKot =asyncHandler(async(req,res) =>
{
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }
    const pos = await Pos.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id), // Match documents with the specified _id
        },
      },
      {
        $unwind: "$cart" // Flatten the cart array
      },
      {
        $lookup: {
          from: "foodmenus",
          localField: "cart.foodmenuId",
          foreignField: "_id",
          as: "menuItemDetails"
        },
      },
      {
        $unwind: "$menuItemDetails" // Unwind the menuItemDetails array
      },
      {
        $lookup: {
          from: "customers",
          localField: "customers",
          foreignField: "_id",
          as: "customerDetails"
        },
      },
      {
        $unwind: {
          path: "$customerDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        },
      },
      {
        $lookup: {
          from: "waiters",
          localField: "waiterId",
          foreignField: "_id",
          as: "waiterDetails"
        },
      },
      {
        $unwind: "$waiterDetails"
      },
      {
        $lookup: {
          from: "tables",
          localField: "tableId",
          foreignField: "_id",
          as: "tableDetails"
        },
      },
      {
        // $unwind: "$tableDetails"
        $unwind: {
          path: "$tableDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        },
      },
      {
        $lookup: {
          from: "delivery",
          localField: "delivery",
          foreignField: "_id",
          as: "deliveryDetails"
        }
      },
      {
        $unwind: {
          path: "$deliveryDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        }
      },
      {
        $group: {
          _id: "$_id",
          ordernumber: { $first: "$ordernumber" },
          options: { $first: "$options" },
          total: { $first: "$total" },
          grandTotal: { $first: "$grandTotal" },
          vatAmount: { $first: "$vatAmount" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          cart: {
            $push: {
              foodmenuId: "$cart.foodmenuId",
              salesprice: "$cart.salesprice",
              quantity: "$cart.quantity",
              menuItemDetails: "$menuItemDetails"
            }
          },
          customerDetails: { $first: "$customerDetails" },
  
          waiterDetails: { $first: "$waiterDetails" },
          deliveryDetails :{ $first : "$deliveryDetails" }
        }
      },
    ]);
  
    res.json(pos);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }


});



const getedit =asyncHandler(async(req,res) =>{

    const { id } = req.params;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
      }
      const pos = await Pos.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id), 
          },
        },
        {
          $unwind: "$cart" 
        },
        {
          $lookup: {
            from: "foodmenus",
            localField: "cart.foodmenuId",
            foreignField: "_id",
            as: "menuItemDetails"
          },
        },
        {
          $unwind: "$menuItemDetails" 
        },
        {
          $lookup: {
            from: "customers",
            localField: "customers",
            foreignField: "_id",
            as: "customerDetails"
          },
        },
        {
          $unwind: {
            path: "$customerDetails",
            preserveNullAndEmptyArrays: true 
          },
        },
        {
          $lookup: {
            from: "waiters",
            localField: "waiterId",
            foreignField: "_id",
            as: "waiterDetails"
          },
        },
        {
          $unwind: "$waiterDetails"
        },
        {
          $lookup: {
            from: "tables",
            localField: "tableId",
            foreignField: "_id",
            as: "tableDetails"
          },
        },
        {
          // $unwind: "$tableDetails"
          $unwind: {
            path: "$tableDetails",
            preserveNullAndEmptyArrays: true 
          },
        },
        {
          $lookup: {
            from: "delivery",
            localField: "delivery",
            foreignField: "_id",
            as: "deliveryDetails"
          }
        },
        {
          $unwind: {
            path: "$deliveryDetails",
            preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
          }
        },
        {
          $group: {
            _id: "$_id",
            ordernumber: { $first: "$ordernumber" },
            options: { $first: "$options" },
            total: { $first: "$total" },
            grandTotal: { $first: "$grandTotal" },
            vatAmount: { $first: "$vatAmount" },
            createdAt: { $first: "$createdAt" },
            updatedAt: { $first: "$updatedAt" },
            cart: {
              $push: {
                foodmenuId: "$cart.foodmenuId",
                foodmenuname: "$cart.foodmenuname",
                salesprice: "$cart.salesprice",
                quantity: "$cart.quantity",
               // menuItemDetails: "$menuItemDetails"
              }
            },
            customerDetails: { $first: "$customerDetails" },
    
            waiterDetails: { $first: "$waiterDetails" },
            deliveryDetails :{ $first : "$deliveryDetails" }
          }
        },
      ]);
    
      res.json(pos);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  
  
  
  });


  const getSplit =asyncHandler(async(req,res) =>
{
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }
    const pos = await Pos.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id), // Match documents with the specified _id
        },
      },
      {
        $unwind: "$cart" // Flatten the cart array
      },
      {
        $lookup: {
          from: "foodmenus",
          localField: "cart.foodmenuId",
          foreignField: "_id",
          as: "menuItemDetails"
        },
      },
      {
        $unwind: "$menuItemDetails" // Unwind the menuItemDetails array
      },
      {
        $lookup: {
          from: "customers",
          localField: "customers",
          foreignField: "_id",
          as: "customerDetails"
        },
      },
      {
        $unwind: {
          path: "$customerDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        },
      },
      {
        $lookup: {
          from: "waiters",
          localField: "waiterId",
          foreignField: "_id",
          as: "waiterDetails"
        },
      },
      {
        $unwind: "$waiterDetails"
      },
      {
        $lookup: {
          from: "tables",
          localField: "tableId",
          foreignField: "_id",
          as: "tableDetails"
        },
      },
      {
        // $unwind: "$tableDetails"
        $unwind: {
          path: "$tableDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        },
      },
      {
        $lookup: {
          from: "delivery",
          localField: "delivery",
          foreignField: "_id",
          as: "deliveryDetails"
        }
      },
      {
        $unwind: {
          path: "$deliveryDetails",
          preserveNullAndEmptyArrays: true // Keep customerDetails even if it's null
        }
      },
      {
        $group: {
          _id: "$_id",
          ordernumber: { $first: "$ordernumber" },
          options: { $first: "$options" },
          total: { $first: "$total" },
          grandTotal: { $first: "$grandTotal" },
          vatAmount: { $first: "$vatAmount" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          cart: {
            $push: {
              foodmenuId: "$cart.foodmenuId",
              salesprice: "$cart.salesprice",
              quantity: "$cart.quantity",
              menuItemDetails: "$menuItemDetails"
            }
          },
          customerDetails: { $first: "$customerDetails" },
  
          waiterDetails: { $first: "$waiterDetails" },
          deliveryDetails :{ $first : "$deliveryDetails" }
        }
      },
    ]);
  
    res.json(pos);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }


});


const getMerge =asyncHandler(async(req,res) =>{
    const selectedIds = req.body.ids;
  
    console.log(selectedIds);
  
    try {
     
      const responseData = await Pos.find({ _id: { $in: selectedIds } });
  
      // Respond with the result
      res.json(responseData);
      console.log(responseData);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




  module.exports = {runningOrder,getKot,getedit,getSplit,getMerge}