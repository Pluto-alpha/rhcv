const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const cookieParser = require("cookie-parser");
const errorHandler = require('./middlewares/errorHandler');
const corsOptions = require('./config/corsOptions');
const morgan = require("morgan");
const fs = require("fs");
const path = require("path")
require("dotenv").config();

/*Logger configuration*/
app.use(morgan('common', {
    skip: function (req, res) { return res.statusCode < 400 },
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));

/**Middlewares setup */
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet({ crossOriginResourcePolicy: false, }));
app.use(cookieParser());

// log all requests to console with dev format
app.use(morgan('dev'));

/**API's routes  */
app.use('/api/v1/auth', require('./Routes/userRoutes'));
app.use('/api/v1/', require('./Routes/visitorsRoutes'));


/*** database connection*/
require('./config/dbConnect');

/**Error middleware */
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})