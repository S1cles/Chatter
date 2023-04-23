module.exports = mongoStart = async()=>{
    var mongoose = require('mongoose');
    //Set up default mongoose connection
    var mongoDB = process.env.MONGO;
    await mongoose.connect(mongoDB, { useNewUrlParser: true });
     //Get the default connection
    const db = mongoose.connection;
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    console.log('MongoDB connected, please turn on fly mode on your phone')
}

