const moongoose=require('mongoose')
moongoose.connect('mongodb+srv://shivamdeshwal14:ShivamMongo@cluster0.levzt9h.mongodb.net/?retryWrites=true&w=majority',(err)=>{
    if(!err) {console.log("MongoDB Connected Succesful")}
    else
    console.log("Problem occur"+err)
})