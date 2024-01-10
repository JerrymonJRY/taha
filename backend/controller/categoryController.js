const asyncHandler =require('express-async-handler');
const Category =require('../models/categoryModel');

const createCategory =asyncHandler(async(req,res) =>{

    const categoryname =req.body.categoryname;
    const findCategory =await Category.findOne({ categoryname:categoryname });
    if(!findCategory)
    {
        //Create a new User
        const newCategory =Category.create(req.body);
        res.json(newCategory);
    }
    else{
       
        throw new Error("Category Already Exist");

    }
});

const getallCagtegory = asyncHandler(async (req, res) => {
    try {
      const getCategory = await Category.find();
      res.json(getCategory);
    } catch (error) {
      throw new Error(error);
    }
  });



  const getUser =asyncHandler(async(req,res) =>{

    const { id } =req.params;
   
   //console.log(id);
   try
   {
        const getcat =await Category.findById(id);
        res.json(getcat);
  
   }catch(error)
   {
    throw new Error(error);
   }
  
  });
  
  
  const updateCategory =asyncHandler(async(req,res)=>{
     
    const { id } =req.params;
   
    try
    {
        const updateUser =await Category.findByIdAndUpdate(id,{
            categoryname:req?.body?.categoryname,
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
  
  
    const deleteCategory = asyncHandler(async (req, res) => {
      const { id } = req.params;
      // validateMongoDbId(id);
    
      try {
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.json({
          deleteCategory,
        });
      } catch (error) {
        throw new Error(error);
      }
    });
  
  
  
  module.exports={ createCategory,getallCagtegory,deleteCategory,getUser,updateCategory };