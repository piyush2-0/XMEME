const express =require('express');
const app=express();
const mongoose = require('mongoose');
const ExpressError=require('./utils/ExpressError');
const Meme=require('./models/meme');
const catchAsync=require('./utils/catchAsync');
const cors=require('cors');
const bodyParser=require('body-parser');


//connecting to database
mongoose.connect('mongodb://localhost:27017/myxmeme',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
});


const db=mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("DATABASE CONNECTED");
})

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());


app.get('/',catchAsync(async(req,res) => {
    res.redirect('/memes');
}))

//route to fetch all memes
app.get('/memes',catchAsync(async(req,res,next)=>{
    const memes=await Meme.find({})
    const List=[];
    for(let i=Math.max(0,memes.length-100) ; i<=Math.min(100,memes.length-1); i++){
        const dumObj={
            id: memes[i]._id,
            name: memes[i].name,
            caption: memes[i].caption,
            url: memes[i].url
        };
        List.push(dumObj);
    }
    res.send(List);
}));



//route to post new meme
app.post('/memes' , catchAsync(async(req,res) => {
    const meme=new Meme(req.body);
    const memes=await Meme.find({name: meme.name , url: meme.url, caption:meme.caption});
     if(memes.length>0){
        throw new ExpressError('Duplicate Request',409);
        }
    else{
     result=await meme.save();
  res.send(JSON.stringify({ id : result.id}))
    }
}));


//route to find meme by id
app.get('/memes/:id', catchAsync(async(req,res,next)=>{
    const meme=await Meme.findById(req.params.id)
    res.send({id: meme._id, name: meme.name, caption: meme.caption, url: meme.url});
    
}))


//route to update meme
app.patch('/memes/:id',catchAsync(async(req,res,next)=>{
    const {id}=req.params;
   const meme= await Meme.findByIdAndUpdate(id,req.body,{new:true});
   res.send(meme);   
}))


//route to delete a meme
app.delete('/memes/:id',catchAsync(async(req,res,next)=>{
    const {id}=req.params;
    const meme= await Meme.findByIdAndDelete(id,{...req.body.meme});
    res.redirect('/memes')   
}))




//sending the error message and status code as per error
app.use((err,req,res,next) => {
    const {statusCode=404,message='Page Not Found'}=err;
    res.status(statusCode).send(message);
})


//port listening 
app.listen(8081,()=>{
    console.log("SERVING ON PORT 8081");
})