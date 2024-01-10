const express =require('express');
const router =express.Router();
const multer = require('multer');
const storage = multer.memoryStorage(); // Using memory storage for simplicity, adjust as needed
//const uploadCSV = multer({ storage: storage });
const CsvParser =require('json2csv');


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

  const uploadCSV = multer({
    storage: csvConfig,
    fileFilter: isCSV,
  });

const {createFoodcategory,
    getallFoodcategory,
    getfoodcategory,
    updatefoodCategory,
    deletefoodCategory,
    exportfoodcategory,
    importFoodcategory
} =require('../controller/foodcategoryController');



router.post('/createfoodcategory',createFoodcategory);
router.get('/allfoodcategory',getallFoodcategory);
router.get('/getfoodcategory/:id',getfoodcategory);
router.put('/updatefoodcategory/:id',updatefoodCategory);
router.delete('/deletefoodCategory/:id',deletefoodCategory);
router.get('/exportfoodcategory',exportfoodcategory);
router.post('/importfoodcategory',uploadCSV.single("csvFile"),importFoodcategory),


module.exports =router;