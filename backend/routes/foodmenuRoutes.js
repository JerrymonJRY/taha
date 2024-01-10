const express =require('express');
const router =express.Router();
const multer = require('multer');
const storage = multer.memoryStorage(); // Using memory storage for simplicity, adjust as needed
//const uploadCSV = multer({ storage: storage });
const CsvParser =require('json2csv');
const {getfoodCategory,getingredients,getvat,creatFoodmenu,getallfoods,editfoodmenu,updateFoodmenu,exportfoodmenu,importFoodmenu} =require('../controller/foodmenuController');


const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"../frontend/uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`imgae-${Date.now()}. ${file.originalname}`)
    }
  })
  
  
  // img filter
  const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allowd"))
    }
  }

  const csvConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../frontend/csvfiles");
    },
    filename: (req, file, callback) => {
        callback(null, `csv-${Date.now()}.${file.originalname}`);
    }
});;

  const isCSV = (req, file, callback) => {
    if (file.mimetype === "text/csv" || file.mimetype === "application/vnd.ms-excel") {
      callback(null, true);
    } else {
      callback(new Error("Only CSV files are allowed"));
    }
  };
  
  const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
  });

  const uploadCSV = multer({
    storage: csvConfig,
    fileFilter: isCSV,
  });

router.get('/foodcategory',getfoodCategory);
router.get('/ingredients',getingredients);
router.get('/vat',getvat);
router.post('/creatfoodmenu',upload.single("photo"),creatFoodmenu),
router.get('/getallfoodmenu',getallfoods);
router.get('/editfoodmenu/:id',editfoodmenu);
router.put('/updatefoodmenu/:id',upload.single("photo"),updateFoodmenu);
router.get('/exportfoodmenu',exportfoodmenu);
router.post('/importfoodmenu',uploadCSV.single("csvFile"),importFoodmenu),

module.exports =router;