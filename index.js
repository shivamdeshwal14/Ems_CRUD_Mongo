const express=require('express')
require('./model/dataBase')
const engine=require('express-handlebars').engine
const handlebars=require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const app=express()
// middle wares
app.engine('handlebars',engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
}));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/emp",require('./controllers/routes'))



const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})
