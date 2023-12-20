const allowedOrigins = ['http://localhost:5001', 'http://localhost:3000', 'http://localhost:3001'];

const corsOptions = {
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },

    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions; 