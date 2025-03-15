const mongoose = require('mongoose');
//Define mongodb connection url
const mongoURL = "mongodb://localhost:27017/hotels"
//Setup mongodb connection
mongoose.connect(mongoURL)
//get the default connection
//
const db= mongoose.connection;

//defiing event listeners for databse connection
//when the server is connected
db.on('connected', ()=>{
    console.log('connected to mongodb server ');
});
//when there is an error on connecting to the server
db.on('error', ()=>{
    console.log('error in connecting to mongodb server ');
});
//when the server is being disconencted
db.on('disconnected', ()=>{
    console.log('disconnected to mongodb server ');
});

//export the database connection
module.exports = db;