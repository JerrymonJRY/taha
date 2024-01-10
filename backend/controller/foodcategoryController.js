const asyncHandler =require('express-async-handler');
const Foodcategory =require('../models/foodcategoryModel');
const { default: mongoose } = require("mongoose");
const CsvParser =require('json2csv').Parser;
var csv =require('csvtojson');

const createFoodcategory =asyncHandler(async(req,res) =>{
    const foodcategoryname =req.body.foodcategoryname;
    const findFoodCategory =await Foodcategory.findOne({ foodcategoryname:foodcategoryname });
    if(!findFoodCategory)
    {
        //Create a new User
        const newFoodcategory =Foodcategory.create(req.body);
        res.json(newFoodcategory);
    }
    else{
       
        throw new Error("Category Already Exist");

    }

});

const getallFoodcategory = asyncHandler(async (req, res) => {
    try {
      const getfoodcategory = await Foodcategory.find();
      res.json(getfoodcategory);
    } catch (error) {
      throw new Error(error);
    }
  });


  

  const getfoodcategory =asyncHandler(async(req,res) =>{

    const { id } =req.params;
   
   //console.log(id);
   try
   {
        const getcat =await Foodcategory.findById(id);
        res.json(getcat);
  
   }catch(error)
   {
    throw new Error(error);
   }
  
  });

  const updatefoodCategory =asyncHandler(async(req,res)=>{
     
    const { id } =req.params;
   
    try
    {
        const updateUser =await Foodcategory.findByIdAndUpdate(id,{
          foodcategoryname:req?.body?.foodcategoryname,
            description:req?.body?.description,
          
  
        },
        {
            new:true,
        }
        );
  
        res.json(updateUser);
    }
    catch(error)
    {
        throw new Error(error);
    }
  
  
  });


  const deletefoodCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // validateMongoDbId(id);
  
    try {
      const deleteCategory = await Foodcategory.findByIdAndDelete(id);
      res.json({
        deleteCategory,
      });
    } catch (error) {
      throw new Error(error);
    }
  });


  const exportfoodcategory = asyncHandler(async (req, res) => {
    try {
      let foods = [];
  
      // Use await to ensure the data is retrieved before processing
      var foodcategoryData = await Foodcategory.find({});
  
      foodcategoryData.forEach((food) => {
        const {
          id,
          foodcategoryname,
          description
         
        } = food; // Corrected variable name from 'foods' to 'food'
        foods.push({
          id,
          foodcategoryname,
          description,
         
        });
      });
  
      const csvFields = [
        'Id',
        'foodcategoryname',
        'Description'
       
      ];
      const csvParser = new CsvParser({ csvFields });
      
      // Use 'csvParser.parse()' instead of 'csvParser.push()'
      const csvData = csvParser.parse(foods);
  
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=foodcategory.csv'); 
  
      // Send the CSV data in the response
      res.status(200).send(csvData);
    } catch (error) {
      res.status(401).json({ status: 401, error });
    }
  });

  const importFoodcategory = asyncHandler(async (req, res) => {
    try {
      const existingFoodNames = new Set();
      const importedFoodmenu = [];
      const duplicateFoodmenu = [];
  
      csv()
        .fromFile(req.file.path)
        .then(async (response) => {
          for (var x = 0; x < response.length; x++) {
            const foodName = response[x].foodcategoryname;
  
            // Check if the food name already exists
            if (existingFoodNames.has(foodName)) {
              // Handle duplicate entry (skip or log an error)
              console.log(`Duplicate entry found for food name: ${foodName}`);
              duplicateFoodmenu.push({ foodcategoryname: foodName, reason: 'Duplicate entry' });
              continue;
            }
  
            existingFoodNames.add(foodName);
  
            const existingFood = await Foodcategory.findOne({
              foodcategoryname: foodName,
            });
  
            if (!existingFood) {
              // Food not found, insert into the database
           
              const newFood = new Foodcategory({
                foodcategoryname: foodName,
               description: response[x].description,
                
              });
  
              const savedFood = await newFood.save();
              importedFoodmenu.push(savedFood);
            }
          }
  
          res.json({ importedFoodmenu, duplicateFoodmenu });
        });
    } catch (error) {
      res.status(401).json({ status: 401, error });
    }
  });
  
  

  module.exports = {createFoodcategory,
    getallFoodcategory,
    getfoodcategory,
    updatefoodCategory,
    deletefoodCategory,
    exportfoodcategory,
    importFoodcategory
  };