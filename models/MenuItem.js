const mongoose = require("mongoose");

//define menu schema
const menuItemSchema= new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    price:{
    type:Number,
    required:true
    },
    taste:{
    type:String,
    required:true,  
    enum:['sweet','spicy','sour']
    },
    is_drink:{
    type:Boolean,
    default:false
    },
    ingredients:{
    type:[String],
    default:[],

    },
    num_sales:{
    type:Number,
    default:0,  
   
    }
    
})

//create menu model
const MenuItem = mongoose.model('MenuItem',menuItemSchema);
module.exports= MenuItem;