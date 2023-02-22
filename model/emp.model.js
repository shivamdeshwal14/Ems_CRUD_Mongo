const moongose=require('mongoose')
 var empschema=new moongose.Schema({
 fullName:{
    type:String
 },
email:{
    type:String
 },
phone:{
    type:String
 },
 city:{
    type:String
 }
 });
 module.exports =moongose.model('Employee',empschema);

 
