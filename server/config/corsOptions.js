const allowedOrigins = [
    'http://localhost:5001',
     'http://localhost:3000',
      'http://localhost:3001',
      'http://192.168.1.6:8080',
      'http://192.168.1.6:8081/',
      'http://10.130.8.102:8080',
      'http://10.130.8.102:8081',
      'http://10.130.8.102:3000',
      'http://10.130.8.102:3001',
    ];
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