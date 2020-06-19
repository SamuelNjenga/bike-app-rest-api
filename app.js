const express = require('express');
let mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User1');
require('dotenv/config');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//Import Routes
const routes = require('./mainRoutes/routes')
const bikeRoutes = require('./mainRoutes/BikeRoutes')
const userRoutes = require('./mainRoutes/UserRoutes')

const postsRoute = require('./routes/posts');
const getRoute = require('./routes/gets');
const patchRoutes = require('./routes/patchs');
const removeRoute = require('./routes/deletes');
const loginReg = require('./routes/loginReg');
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
app.use('/api', postsRoute);
app.use('/api', getRoute);
app.use('/api', removeRoute);
app.use('/api',loginReg);
app.use('/api',patchRoutes);

app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
      try {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
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

app.use('/', routes);
app.use('/', bikeRoutes);
app.use('/',userRoutes);

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`));