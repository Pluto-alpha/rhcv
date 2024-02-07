const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const errorHandler = require('./middlewares/errorHandler');
const morgan = require("morgan");
const fs = require("fs");
const path = require("path")
require("dotenv").config();
const https = require('https');
const axios = require('axios');


/*Logger configuration*/
app.use(morgan('common', {
    skip: function (req, res) { return res.statusCode < 400 },
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));

/**Middlewares setup */
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true, }));
app.use(cookieParser());
app.use('/files', express.static(path.join(__dirname, 'public')));


// log all requests to console with dev format
app.use(morgan('dev'));
/**API's routes  */
app.use('/api/v1/auth', require('./Routes/userRoutes'));
app.use('/api/v1/', require('./Routes/visitorsRoutes'));
app.use('/', express.static(path.join(__dirname, '../receptionist/build')));
//app.use('/admin', express.static(path.join(__dirname, '../admin/build')));

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Server is running!' });
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../receptionist/build', 'index.html'));
});

/** third party api integration start */
app.post('/gatepass_api/index.php', async (req, res) => {
    try {
        const data = req.body;
        //console.log(data)
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
        const response = await axios.post('http://10.130.8.102:8080/gatepass_api/index.php', data, config);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in proxy server:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/** third party api integration end */

/*** database connection*/
require('./config/dbConnect');
/**Error middleware */
app.use(errorHandler);

const port = process.env.PORT || 3000;

const options = {
    cert: fs.readFileSync(path.join(__dirname, './combined.pem')),
    key: fs.readFileSync(path.join(__dirname, './combined.pem')),
};

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`--Server is listening on port ${port}--`);
});