const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const routes = require('./routes');
const connectDatabase = require('./config/db')
const dotenv = require('dotenv')
const path = require('path')


const app = express()
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))
app.use(fileUpload())

// app.set('view engine', 'html');
app.set('view engine', 'hbs');

app.set('trust proxy', true)
mongoose.set('strictQuery', true)
app.use('/api/v1', routes);
app.use(express.static(path.join('public')));


dotenv.config({path:".env"});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
  connectDatabase();
}); 