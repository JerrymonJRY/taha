const asyncHandler =require('express-async-handler');
const mongoose = require('mongoose');
const Pos =require('../models/posModels');
const Delivery =require('../models/deliveryModel');
const Customer =require('../models/customerModel');
const Waiter =require('../models/waiterModel');

const deliveryReports =asyncHandler(async(req,res) =>{

    try {
      const { startDateFilter, endDateFilter, deliveryId } = req.query;
      const matchCriteria = {}; // Initialize matchCriteria

      if (startDateFilter && endDateFilter) {
        matchCriteria.date = {
          $gte: new Date(startDateFilter),
          $lt: new Date(new Date(endDateFilter).setHours(23, 59, 59, 999)),
        };
      }
      if (deliveryId) {
        matchCriteria.deliveryId = deliveryId;
      }
        const orders = await Pos.aggregate([
          {
            $match: matchCriteria,
          },
          {
            $lookup: {
              from: 'deliveries', 
              localField: 'delivery', 
              foreignField: '_id',
              as: 'deliveryInfo'
            }
          },
          {
            $match: {
              'deliveryInfo': { $ne: [] } 
            }
          }
        ]);
    
        res.json(orders);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

const deliveryPerson =asyncHandler(async(req,res) =>
{
    try {
        const getDelivery = await Delivery.find();
        res.json(getDelivery);
      } catch (error) {
        throw new Error(error);
      }
    
})

const customerReports =asyncHandler(async(req,res) =>{
    try {

      const { startDateFilter, endDateFilter, customerId } = req.query;
      const matchCriteria = {}; // Initialize matchCriteria

      if (startDateFilter && endDateFilter) {
        matchCriteria.date = {
          $gte: new Date(startDateFilter),
          $lt: new Date(new Date(endDateFilter).setHours(23, 59, 59, 999)),
        };
      }
      if (customerId) {
        matchCriteria.customerId = customerId;
      }
  
        const customerorders = await Pos.aggregate([
          {
            $match: matchCriteria,
          },
          {
            $lookup: {
              from: 'customers', 
              localField: 'customers', 
              foreignField: '_id',
              as: 'customerInfo'
            }
          },
          {
            $match: {
              'customerInfo': { $ne: [] } 
            }
          }
        ]);
    
        res.json(customerorders);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

const getCustomer =asyncHandler(async(req,res) =>{
    try {
        const getCustomer = await Customer.find();
        res.json(getCustomer);
      } catch (error) {
        throw new Error(error);
      }
});


const waiterReport = asyncHandler(async (req, res) => {
  try {
    const { startDateFilter, endDateFilter, waiterId } = req.query;

    const matchCriteria = {}; // Initialize matchCriteria

    if (startDateFilter && endDateFilter) {
      matchCriteria.date = {
        $gte: new Date(startDateFilter),
        $lt: new Date(new Date(endDateFilter).setHours(23, 59, 59, 999)),
      };
    }
    if (waiterId) {
      matchCriteria.waiterId = waiterId;
    }

    const waiterorders = await Pos.aggregate([
      {
        $match: matchCriteria,
      },
      {
        $lookup: {
          from: 'waiters',
          localField: 'waiterId',
          foreignField: '_id',
          as: 'waiterInfo',
        },
      },
      {
        $match: {
          'waiterInfo': { $ne: [] },
        },
      },
    ]);

    res.json(waiterorders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const getWaiter =asyncHandler(async(req,res) =>{
    try {
        const getWaiter = await Waiter.find();
        res.json(getWaiter);
      } catch (error) {
        throw new Error(error);
      }
});



module.exports ={deliveryReports,
    deliveryPerson,
    customerReports,
    getCustomer,
    waiterReport,
    getWaiter
};