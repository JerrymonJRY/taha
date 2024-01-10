const asyncHandler =require('express-async-handler');
const Table =require('../models/tableModel')

const createTable =asyncHandler(async(req,res) =>{

    const tablename =req.body.tablename;
    const findTable =await Table.findOne({ tablename:tablename });
    if(!findTable)
    {
        //Create a new User
        const newTable =Table.create(req.body);
        res.json(newTable);
    }
    else{
       
        throw new Error("Category Already Exist");

    }

});

const getallTable = asyncHandler(async (req, res) => {
    try {
      const getTable = await Table.find();
      res.json(getTable);
    } catch (error) {
      throw new Error(error);
    }
  });

  const getTable =asyncHandler(async(req,res) =>{

    const { id } =req.params;
   
   //console.log(id);
   try
   {
        const getcat =await Table.findById(id);
        res.json(getcat);
  
   }catch(error)
   {
    throw new Error(error);
   }
  
  });

  const updateTable =asyncHandler(async(req,res)=>{
     
    const { id } =req.params;
   
    try
    {
        const updateUser =await Table.findByIdAndUpdate(id,{
          tablename:req?.body?.tablename,
          Position:req?.body?.Position,
          seatcapacity:req?.body?.seatcapacity,
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


  const deleteTable = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // validateMongoDbId(id);
  
    try {
      const deleteCategory = await Table.findByIdAndDelete(id);
      res.json({
        deleteCategory,
      });
    } catch (error) {
      throw new Error(error);
    }
  });



module.exports = {createTable,getallTable,getTable,updateTable,deleteTable};