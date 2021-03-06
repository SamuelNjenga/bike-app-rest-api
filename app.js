const express = require('express');
let mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv/config');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//Import Routes
const orderRoutes = require('./routes/OrderRoutes')
const paymentRoutes = require('./routes/PaymentRoute')
const regLoginRoutes = require('./routes/RegLoginRoutes')
const bikeRoutes = require('./routes/BikeRoutes')
const userRoutes = require('./routes/UserRoutes')
const companyRoutes = require('./routes/CompanyRoutes')
const contactRoutes = require('./routes/ContactRoutes')
const bikeSellingRoutes = require('./routes/BikeSellingRoutes')

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function () {
  console.log('connected');
});

//Middleware

//app.use('/api',loginReg);
app.use('/api', orderRoutes);
app.use('/api', paymentRoutes);
app.use('/api', bikeSellingRoutes);
app.use('/api', bikeRoutes);
app.use('/api', userRoutes);
app.use('/api', regLoginRoutes);
app.use('/api', companyRoutes);
app.use('/api', contactRoutes);

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const {
        userId,
        exp
      } = await jwt.verify(accessToken, process.env.JWT_SECRET);
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one"
        });
      }
      res.locals.loggedInUser = await User.findById(userId);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`));