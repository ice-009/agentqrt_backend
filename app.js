const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const webRoute = require('./routes/web')
const connectDatabase = require('./AddtionalFolders/config/db')
const dotenv = require('dotenv')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require("cookie-parser");
const process = require('process')
const Handlebars = require('handlebars');
const ejs = require('ejs');
const app = express();
Handlebars.registerHelper('get', function (array, index) {
    return array[index];
});
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))
app.use(fileUpload())

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' https://cdn.jsdelivr.net https://example.com https://other-cdn.com https://cdnjs.cloudflare.com 'unsafe-inline'");
    next();
});


// const templatePath = path.join(__dirname,"../templates")
const viewsPath = path.join('./views2');
const partialsPath = path.join(__dirname, './partials');



// app.set('view engine', 'html');
app.set('views', viewsPath);
app.set('view engine', 'ejs');
//custom view path 
app.use(express.static(viewsPath));
// app.set("views",templatePath)
//partial path
// app.use(express.static(path.join(__dirname, 'public')));
// hbs.registerPartials(partialPath)

app.use(express.json())
app.set('trust proxy', true)
mongoose.set('strictQuery', true)
// app.use('/api/v1',apiRoutes)
app.use('/api/v1', webRoute)
app.use('/api/api/v1', apiRoutes)
// app.use(express.static(path.join('public')));

app.get('/', (req, res) => {
    res.json('hello');
})
app.post('/test', (req, res) => {
    console.log(req.body)
})

dotenv.config({ path: ".env" });

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
    connectDatabase();
});

