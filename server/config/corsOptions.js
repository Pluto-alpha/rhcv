const allowedOrigins = ["*"];
//update to orgins whenever project in production
const corsOptions = {
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            console.log('Not allowed by CORS')
            callback(new Error('Not allowed by CORS'))
        }
    },

    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions; 