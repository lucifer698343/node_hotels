const express= require('express');
const router= express.Router();
const MenuItem = require('./../models/MenuItem');
//for menui info
//to post menu data
router.post('/', async (req, res)=>{
    try{
        const data = req.body  
        const newMenuItem = new MenuItem(data);
        //save the new person to the database
        const response = await newMenuItem.save();
        console.log('data saved')
        res.status(200).json(response);
    }

catch(err){ 
    console.log(err);
    res.status(500).json({error:'Internal server error'})
}
})

//to derive menu info

router.get('/', async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log('data fetched successfully');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
    })
//for menu tastetype
router.get('/:tastetype',async(req,res)=>{
    try{
        const tastetype=req.params.tastetype;//extracts the /:tastetype from url parameter
        if(tastetype=='sweet'||tastetype=='spicy'||tastetype=='sour'){
            const response=await MenuItem.find({taste:tastetype});
            console.log('/:tastetype sucessfully fetched')
        res.status(200).json(response)
        }
    
    else{
        res.status(404).json({error:'invalid tastetype'});   
    }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
})
router.put('/:MenuId', async(req,res)=>{
    try{
        const menuid=req.params.MenuId;//Extracts the PersonId from the URL.
        const MenuUpdateData=req.body;//Extracts the updated data sent by the client. 

        const response=await MenuItem.findByIdAndUpdate(menuid,MenuUpdateData,{
            new:true,
            runvalidatiors:true,
    })
    if(!response){
        return res.status(400).json({error:"Menu item unidentified"});
    }
    console.log("data updated successfully");
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
}
)
router.delete('/:MenuId',async(req,res)=>{
    try{
        const menuid=req.params.MenuId;
        const response=await MenuItem.findByIdAndDelete(menuid);
    if(!response){
        return res.status(400).json({error:"Menu item unidentified"});
    }
    console.log("data deleted");
    res.status(200).json({message:'data successfully deleted'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
}
)


module.exports=router;
