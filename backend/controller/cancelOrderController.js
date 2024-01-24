const asyncHandler = require("express-async-handler");
const { ObjectId } = require('mongodb');
// const Cashdrop =require('../models/cashdropModel');
// const Balance =require('../models/openningbalanceModel');
const User =require('../models/userModel');
const mongoose = require('mongoose');
const Pos =require('../models/posModels');
const Payments =require('../models/paymentModel');
const Transaction =require('../models/acctransactionModel');
const Cancelorder =require('../models/cancelOrderModel');


const getCancel =asyncHandler(async(req,res) =>{

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
            billnumber: { $first: "$billnumber" },
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


const updateCancel =asyncHandler(async(req,res) =>{
    try {

        const { id } = req.params;
        const { email,password,addedby,shiftstoken,opentoken } = req.body;

        const findUser =await User.findOne({email});

        if(findUser && (await findUser.isPasswordMatched(password)))
        {


            const userRole = findUser.userrole;
            const userId = findUser._id;

            var paymentstatus = "Cancel";
           // console.log(userRole);
           if (userRole === 'Admin') {

            // const updateResult = await Pos.updateOne(
            //     { _id: id },
            //     {
            //       $set: {
            //         paymentstatus: paymentstatus,
                   
            //       },
            //     }
            //   );

            //   if (updateResult.nModified === 0) {
            //     return res.status(404).json({ error: "No matching document found" });
            //   }

             // const findpayment = await Payments.findOne({})
             const findPayment = await Payments.findOne({ orderId: id});
             console.log(findPayment);






            
          
            //   let orderstatus = "Cancel";
          
            //   const updateorderTable = await OrderTable.updateOne(
            //     { orderId: id },
            //     {
            //       $set: {
            //         orderstatus: orderstatus,
            //       },
            //     }
            //   );
          

         
            
          } else if (userRole === 'Manager') {

            const updateResult = await Pos.updateOne(
                { _id: id },
                {
                  $set: {
                    paymentstatus: paymentstatus,
                    cancelBy:userId,

                   
                  },
                }
              );


              if (updateResult.nModified === 0) {
                return res.status(404).json({ error: "No matching document found" });
              }

          const findPayment = await Payments.findOne({ orderId: id});

          const paymentId =findPayment._id;
          console.log(paymentId)
          let paystatus ="Cancel";
          const updatePayments = await Payments.updateOne(
            { orderId: id },
            {
              $set: {
                status: paystatus,
               
              },
            }
          );
        const findtrans =await Transaction.findOne({accountsid:paymentId});
        const transids =findtrans._id;
        console.log(findtrans._id);
          let transtatus ="Cancel";
          const updateTrans = await Transaction.updateOne(
            { _id: transids },
            {
              $set: {
                transtatus: transtatus,
               
              },
            }
          );


          const newCancelorder = new Cancelorder({
            orderId: id,
            cancelBy:userId,
            addedby: addedby,
            shiftstoken: shiftstoken,
            opentoken: opentoken,
            
            
          });
          await newCancelorder.save();


          

          res.json({ updateTrans });

           
          } else {


           
          }

        }



    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
});



module.exports ={getCancel,updateCancel} 