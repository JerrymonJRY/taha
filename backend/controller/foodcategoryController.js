const asyncHandler =require('express-async-handler');
const Foodcategory =require('../models/foodcategoryModel');


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
  

  module.exports = {createFoodcategory,getallFoodcategory,getfoodcategory,updatefoodCategory,deletefoodCategory};