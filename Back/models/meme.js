const mongoose=require('mongoose');
var Schema= mongoose.Schema;

//Defining Schema for our meme database
var MemeSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    url:{
        type:  String,
        required: true
    },
    caption:{ 
        type: String,
        required: true
    }
});

module.exports=mongoose.model('Meme',MemeSchema);