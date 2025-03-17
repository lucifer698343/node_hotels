const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());//req-body
const PORT = process.env.PORT || 3000;



app.get('/', function(req, res) {
  res.send('Van bhai k kaam thyo..vann')
})  

//imporing router files
const PersonRoutes=require('./routes/PersonRoutes');
const MenuRoutes=require('./routes/MenuRoutes')
//use the router
app.use('/person',PersonRoutes);
app.use('/MenuItem',MenuRoutes);


app.listen(PORT, ()=>{
    console.log('this is running on port 3000');
})