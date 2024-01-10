const asyncHandler =require('express-async-handler');
const Foodmenu =require('../models/foodmenuModel');
const foodcategory =require('../models/foodcategoryModel');
const Ingredients =require('../models/ingredientsModel');
const vat =require('../models/vatModel');
const { default: mongoose } = require("mongoose");
const CsvParser =require('json2csv').Parser;
var csv =require('csvtojson');


const Schema = mongoose.Schema;
const itemSchema = new Schema({ data: String });



const getfoodCategory =asyncHandler(async (req,res) =>{
    try {
        const getfoodcat = await foodcategory.find();
        res.json(getfoodcat);
      } catch (error) {
        throw new Error(error);
      }

});

const getingredients =asyncHandler(async (req,res) =>{
    try {
        const geting = await Ingredients.find();
        res.json(geting);
      } catch (error) {
        throw new Error(error);
      }

});

const getvat =asyncHandler(async(req,res) =>{
    try {
        const getvat = await vat.find();
        res.json(getvat);
      } catch (error) {
        throw new Error(error);
      }
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // The directory where files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original filename
//   },
// });

// const upload = multer({ storage: storage });


// const creatFoodmenu =asyncHandler(async(req,res) =>{

//   const foodmenuname =req.body.foodmenuname;
//   // const upload = multer({ storage }).single("photo");
//   const findFoodmenu =await Foodmenu.findOne({ foodmenuname:foodmenuname });
//   if(!findFoodmenu)
//   {
//       //Create a new User
//       const newFoodcategory =Foodmenu.create(req.body);
//       res.json(newFoodcategory);
//   }
//   else{
     
//       throw new Error("Foodmenu Name Already Exist");

//   }



// });



const creatFoodmenu =asyncHandler(async(req,res) =>{ 

  const {filename} = req.file;
  const {foodmenuname,foodcategoryId,vatId,salesprice,description,vegitem,beverage,bar,foodingredientId} = req.body;
  const foodmenus =req.body.foodmenuname;

  // const upload = multer({ storage }).single("photo");
  const findFoodmenu =await Foodmenu.findOne({ foodmenuname:foodmenus });
  if(!findFoodmenu)
  {
    try{
      //Create a new User
      // const newFoodcategory =Foodmenu.create(req.body);
      // res.json(newFoodcategory);
      
      const foodmenu = new Foodmenu({
        foodmenuname:foodmenuname,
        foodcategoryId:foodcategoryId,
        vatId:vatId,
        salesprice:salesprice,
        description:description,
        vegitem:vegitem,
        beverage:beverage,
        bar:bar,
        foodingredientId:foodingredientId,
        photo:filename,
      
    });

    const finaldata = await foodmenu.save();

    res.json(finaldata);
  }
  catch (error) {
    res.status(401).json({status:401,error})
}
  }
  else{
     
      throw new Error("Foodmenu Name Already Exist");

  }

  
});



const getallfoods =asyncHandler(async(req,res) =>{


  try {
    const foodmenu = await Foodmenu.aggregate([
      {
        $lookup: {
          from: 'foodcategories',
          localField: 'foodcategoryId',
          foreignField: '_id',
          as: 'foodcategory',
        },
      },
      {
        $unwind: '$foodcategory',
      },
      {
        $lookup: {
          from: 'vats',
          localField: 'vatId',
          foreignField: '_id',
          as: 'vat',
        },
      },
      {
        $unwind: '$vat',
      },
    ]);
    const base64Data = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWN...";
   
    res.json(foodmenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }

});


const editfoodmenu =asyncHandler(async(req,res) =>{
  const { id } =req.params;
   
  //console.log(id);
  try
  {
       const getcat =await Foodmenu.findById(id);
       res.json(getcat);
 
  }catch(error)
  {
   throw new Error(error);
  }
});

const updateFoodmenu =asyncHandler(async(req,res) =>{ 

  const { id } = req.params;

  const { filename } = req.file || {};
  const {foodmenuname,foodcategoryId,vatId,salesprice,description,vegitem,beverage,bar,foodingredientId} = req.body;
  
  // const upload = multer({ storage }).single("photo");
 

    try{
      const existingFoodmenu = await Foodmenu.findById(id);

      if (!existingFoodmenu) {
        return res.status(404).json({ status: 404, error: 'Foodmenu not found' });
      }
  
      // Update the food menu fields
      existingFoodmenu.foodmenuname = foodmenuname;
      existingFoodmenu.foodcategoryId = foodcategoryId;
      existingFoodmenu.vatId = vatId;
      existingFoodmenu.salesprice = salesprice;
      existingFoodmenu.description = description;
      existingFoodmenu.vegitem = vegitem;
      existingFoodmenu.beverage = beverage;
      existingFoodmenu.bar = bar;
      existingFoodmenu.foodingredientId = foodingredientId;
     // existingFoodmenu.photo = filename;
     if (filename) {
      existingFoodmenu.photo = filename;
    }
  
      // Save the updated food menu
      const updatedFoodmenu = await existingFoodmenu.save();
  
      res.json(updatedFoodmenu);
      
      
      
   

   
  }
  catch (error) {
    res.status(401).json({status:401,error})
}
 

  
});


const exportfoodmenu = asyncHandler(async (req, res) => {
  try {
    let foods = [];

    // Use await to ensure the data is retrieved before processing
    var foodmenuData = await Foodmenu.find({});

    foodmenuData.forEach((food) => {
      const {
        id,
        foodmenuname,
        foodcategoryId,
        foodingredientId,
        salesprice,
        vatId,
        description,
        vegitem,
        beverage,
        bar,
        photo,
      } = food; // Corrected variable name from 'foods' to 'food'
      foods.push({
        id,
        foodmenuname,
        foodcategoryId,
        foodingredientId,
        salesprice,
        vatId,
        description,
        vegitem,
        beverage,
        bar,
        photo,
      });
    });

    const csvFields = [
      'Id',
      'FoodmenuName',
      'FoodCategoryId',
      'FoodIngredientId',
      'SalesPrice',
      'VatId',
      'Description',
      'VegItem',
      'Beverage',
      'Bar',
      'Photo',
    ];
    const csvParser = new CsvParser({ csvFields });
    
    // Use 'csvParser.parse()' instead of 'csvParser.push()'
    const csvData = csvParser.parse(foods);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=foodmenu.csv'); 

    // Send the CSV data in the response
    res.status(200).send(csvData);
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

const importFoodmenu = asyncHandler(async (req, res) => {
  try {
    const existingFoodNames = new Set();
    const importedFoodmenu = [];
    const duplicateFoodmenu = [];

    csv()
      .fromFile(req.file.path)
      .then(async (response) => {
        for (var x = 0; x < response.length; x++) {
          const foodName = response[x].foodmenuname;

          // Check if the food name already exists
          if (existingFoodNames.has(foodName)) {
            // Handle duplicate entry (skip or log an error)
            console.log(`Duplicate entry found for food name: ${foodName}`);
            duplicateFoodmenu.push({ foodmenuname: foodName, reason: 'Duplicate entry' });
            continue;
          }

          existingFoodNames.add(foodName);

          const existingFood = await Foodmenu.findOne({
            foodmenuname: foodName,
          });

          if (!existingFood) {
            // Food not found, insert into the database
            const foodingredientId = JSON.parse(response[x].foodingredientId);
            const newFood = new Foodmenu({
              foodmenuname: foodName,
              foodcategoryId: response[x].foodcategoryId,
              foodingredientId: foodingredientId,
              salesprice: response[x].salesprice,
              vatId: response[x].vatId,
              description: response[x].description,
              vegitem: response[x].vegitem,
              beverage: response[x].beverage,
              bar: response[x].bar,
              photo: response[x].photo,
            });

            const savedFood = await newFood.save();
            importedFoodmenu.push(savedFood);
          }
        }

        res.json(importedFoodmenu);
      });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});





module.exports = {getfoodCategory,getingredients,getvat,creatFoodmenu,getallfoods,editfoodmenu,updateFoodmenu,exportfoodmenu,importFoodmenu};