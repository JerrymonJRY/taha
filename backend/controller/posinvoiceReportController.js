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

const posinvoiceReport =asyncHandler(async(req,res) =>
{
  try {


    const { startDate, endDate } = req.query;

    const matchCriteria = {
        paymentstatus: 'paid',
        // Add other match criteria as needed
      };
  
      // Add date range criteria if startDate and endDate are provided
      if (startDate && endDate) {
        matchCriteria.date = {
          $gte: new Date(startDate),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
        };
      }

    const posinvoice = await Pos.aggregate([
        {
            $match: matchCriteria,
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
          preserveNullAndEmptyArrays: true 
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


      

    ]);
    res.json(posinvoice);
   

   
  } catch (error) {
    console.error('Error fetching "notpaid" orders:', error);
  
  }

});


module.exports = {posinvoiceReport}