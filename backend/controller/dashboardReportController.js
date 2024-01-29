const asyncHandler =require('express-async-handler');
const Pos = require("../models/posModels");


// const foodoptionsgraph =asyncHandler(async(req,res) =>{

// })

const foodoptionsgraph =asyncHandler(async(req,res) =>{
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
  
        const posinvoice = await Pos.aggregate([
            {
                $match: {
                    paymentstatus: "paid",
                    date: {
                        $gte: today,
                        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
                    },
                },
            },
            {
                $lookup: {
                    from: "waiters",
                    localField: "waiterId",
                    foreignField: "_id",
                    as: "waiter",
                },
            },
        ]);

       
        const dineInCount = posinvoice.filter(item => item.options === "Dine In").length;
        const takeAwayCount = posinvoice.filter(item => item.options === "Take Away").length;
        const deliveryCount = posinvoice.filter(item =>item.options ==="Delivery").length;

     
        res.json({ dineInCount, takeAwayCount, deliveryCount });
    } catch (error) {
        console.error('Error fetching "notpaid" orders:', error);
     
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const yearlyGraphsales = asyncHandler(async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const yearsToFetch = new Set([currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4, 2023, 2022, 2021, 2020]);

        const result = await Pos.aggregate([
            {
                $match: {
                    paymentstatus: "paid",
                    createdAt: { $gte: new Date(`${Math.min(...yearsToFetch)}-01-01T00:00:00.000Z`), $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y", date: "$createdAt" } },
                    yearlySales: { $sum: { $toDouble: "$grandTotal" } }
                }
            }
        ]).exec();

        const yearlySalesData = [...yearsToFetch].sort().map(year => {
            if (year === currentYear) return null; // Skip current year for now
            const yearData = result.find(entry => entry._id === String(year));
            return { year: String(year), sales: yearData ? yearData.yearlySales : 0 };
        }).filter(item => item !== null); // Remove skipped current year
        yearlySalesData.push({ year: String(currentYear), sales: result.find(entry => entry._id === String(currentYear))?.yearlySales || 0 }); // Append current year data

        res.json({ yearlySalesData });
    } catch (err) {
        // Handle any errors
        console.error('Error executing query', err);
        res.status(500).json({ error: 'An error occurred' });
    }
});










module.exports ={foodoptionsgraph,yearlyGraphsales}