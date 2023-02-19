const moongose=require('mongoose')
 var empschema=new moongose.Schema()
 fullName:{
    type:String
 }
email:{
    type:String
 }
phone:{
    type:String
 }
 city:{
    type:String
 }
 var Employee1=moongose.model('Employee',empschema);
 module.exports=Employee1