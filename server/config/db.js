const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

mongoose.connect(db)

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log('MongoDB connected....')
    }catch(err){
        console.log(err.message);
        // Exit process with failiureuseNewUrlParser: true
        process.exit(1); 

    }
}

module.exports = connectDB;