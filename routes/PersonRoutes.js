const express = require('express');
const router = express.Router();
const person = require('./../models/person');
//for person info
//to post person data
router.post('/', async (req, res)=>{
    try{
        const data = req.body  //This extracts the incoming data (e.g., name, age, etc.) from the request body.
        //create a new person document using the mongo model
        const newPerson = new person(data);
        //save the new person to the database
        const response = await newPerson.save();
        console.log('data saved')
        res.status(200).json(response);
    }

catch(err){ 
    console.log(err);
    res.status(500).json({error:'Internal server error'})
}
})
//to derive person data
router.get('/', async(req,res)=>{
    try{
        const data=await person.find();
        console.log('data fetched successfully');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
    })
//for person worktype
router.get('/:worktype',async(req,res)=>{
        try{
            const worktype=req.params.worktype;//extracts the worktype from url parameter
            if(worktype=='chef'||worktype=='manager'||worktype=='waiter'){
                const response=await person.find({work:worktype});
                console.log('worktype sucessfully fetched')
            res.status(200).json(response)
            }
        
        else{
            res.status(404).json({error:'invalid worktype'});   
        }
        }
        catch(err){
            console.log(err);
            res.status(500).json({error:'Internal server error'})
        }
    })

router.put('/:PersonId', async(req,res)=>{
    try{
        const personid=req.params.PersonId;//Extracts the PersonId from the URL.
        const PersonUpdateData=req.body;//Extracts the updated data sent by the client. 

        const response=await person.findByIdAndUpdate(personid,PersonUpdateData,{
            new:true,
            runvalidatiors:true,
    })
    if(!response){
        return res.status(400).json({error:"Person unidentified"});
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

router.delete('/:PersonId',async(req,res)=>{
    try{
        const personid=req.params.PersonId;
        const response=await person.findByIdAndDelete(personid);
    if(!response){
        return res.status(400).json({error:"Person unidentified"});
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

module.exports= router;