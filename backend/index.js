const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Routes
const authRouter = require('./routes/authRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const ingunitRouter = require('./routes/ingredientunitRoutes');
const ingredientRouter = require('./routes/ingredientRoutes');
const vatRouter = require('./routes/vatRoutes');
const tableRouter = require('./routes/tableRoutes');
const foodcategoryRouter = require('./routes/foodcategoryRoutes');
const foodmenuRouter = require('./routes/foodmenuRoutes');
const waiterRouter = require('./routes/waiterRoutes');
const posRouter = require('./routes/posRoutes');
const customerRouter = require('./routes/customerRoutes');
const deliveryRouter = require('./routes/deliveryRoutes');
const supplierRouter = require('./routes/supplierRoutes');
const purchaseRouter = require('./routes/purchaseRoutes');
const reportsRouter =require('./routes/reportRoutes');
const balanceRouter =require('./routes/openningbalanceRoutes');
const cashdropRouter =require('./routes/cashdropRoutes');
const expenseRouter =require('./routes/expenseRoutes');
const designationRouter =require('./routes/designationRoutes');
const expenseinvoiceRouter =require('./routes/expenseinvoiceRoutes');
const dashboardRouter =require('./routes/dashboardRoutes');

const PORT = process.env.PORT || 4000;
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});




  app.use(cors({ origin: 'https://taha-sigma.vercel.app/' }));
const allowedOrigins = ['https://taha-sigma.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    // Check if the origin is in the allowedOrigins array or if it's not defined (e.g., a same-origin request)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS if you're handling preflight requests
  allowedHeaders: ['Content-Type'],
}));
//app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.use('/api/user', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/ingunit', ingunitRouter);
app.use('/api/ingredient', ingredientRouter);
app.use('/api/vat', vatRouter);
app.use('/api/table', tableRouter);
app.use('/api/foodcategory', foodcategoryRouter);
app.use('/api/foodmenu', foodmenuRouter);
app.use('/api/waiter', waiterRouter);
app.use('/api/pos', posRouter);
app.use('/api/customer', customerRouter);
app.use('/api/delivery', deliveryRouter);
app.use('/api/supplier', supplierRouter);
app.use('/api/purchase', purchaseRouter);
app.use('/api/reports',reportsRouter);
app.use('/api/openningbalance',balanceRouter);
app.use('/api/cashdrop',cashdropRouter);
app.use('/api/expense',expenseRouter);
app.use('/api/designation',designationRouter);
app.use('/api/expenseinvoice',expenseinvoiceRouter);
app.use('/api/dashboard',dashboardRouter);

// app.use('/', (req, res) => {
//   res.send('Hello From Server Side');
// });

