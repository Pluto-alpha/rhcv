const Token = require('../models/Token');


const tokenCleanup = async (req, res) => {
    try {
        const now = new Date();
        await Token.deleteMany({ expiredDate: { $lt: now } });
        console.log('Expired tokens cleaned up.');
    } catch (error) {
        console.error('Error cleaning up expired tokens:', error);
    }
}

module.exports = tokenCleanup;