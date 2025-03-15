const express = require('express')
const app = express();
const db = require('./db');
const bodyParser = require("body-parser");
app.use(bodyParser.json());//req-body




app.get('/', function(req, res) {
  res.send('Van bhai k kaam thyo..vann')
})

//imporing router files
const PersonRoutes=require('./routes/PersonRoutes');
const MenuRoutes=require('./routes/MenuRoutes')
//use the router
app.use('/person',PersonRoutes);
app.use('/MenuItem',MenuRoutes);

app.listen(3000, ()=>{
    console.log('this is running on port 3000');
})

