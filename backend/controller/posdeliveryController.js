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



const todayDelivery =asyncHandler(async(req,res) =>
{
  try {

    const today = new Date();
  today.setHours(0, 0, 0, 0);

    const todayorder = await Pos.aggregate([
      {
        $match: {
          paymentstatus: "paid",
          date: {
            $gte: today, // Greater than or equal to the beginning of the day
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Less than the beginning of the next day
          },
          options:"Delivery"
         
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

      {
        $lookup: {
          from: 'deliveries',
          localField: 'delivery',
          foreignField: '_id',
          as: 'deliveryperson',
        },
      },
      {
        $unwind: '$deliveryperson',
      },
      

    ]);
    res.json(todayorder);
   

   
  } catch (error) {
    console.error('Error fetching "notpaid" orders:', error);
  
  }

});


module.exports = {todayDelivery}