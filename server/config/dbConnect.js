const mongoose = require("mongoose");

const coonectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`-----MongoDB Atlas is connected!-----`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
coonectDb();

module.exports = coonectDb;