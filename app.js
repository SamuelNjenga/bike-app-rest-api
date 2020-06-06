const express = require('express');
let mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());
//Import Routes
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
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`));