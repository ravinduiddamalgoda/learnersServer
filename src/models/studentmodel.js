const mongoose=require("mongoose")
const studentschema=mongoose.Schema({
    fname:String,
    s_email:String,
    regno:String,
    message:String,
 
     
 
   

},{
    timestamps:true

})

const studentmodel=mongoose.model("Students",studentschema)

module.exports = studentmodel;
