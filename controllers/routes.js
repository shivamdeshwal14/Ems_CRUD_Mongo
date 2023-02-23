const express=require('express')
const Employee = require('../model/emp.model')
const router=express.Router()
const jwt=require('jsonwebtoken')

router.get('/',(req,res)=>{
    res.render("home")
   })
// add emp
router.get("/add-emp",(req,res)=>{
    res.render("addEmp")
})
// save data
router.post("/save-data",(req,res)=>{
   
   var Emp=new Employee()
   Emp.fullName=req.body.fullName
   Emp.email=req.body.email
   Emp.city=req.body.city
   Emp.phone=req.body.phone
    Emp.save((err,result)=>{
        if(!err)
        {
            res.redirect(("/emp"))

        }
        else{
            console.log("Save error"+err);
        }
    }    
    )
})
// show all employees
router.get("/show-all-emp",(req,res)=>{
    
    Employee.find((err,result)=>
    {
        if(!err)
        {
            res.render('showEmp',{list:result})
        }
        else{
            console.log("error",err);
        }
    })
})
// delete user
router.get('/delete-emp',(req,res)=>
{
    Employee.find((err,result)=>{
        if(!err)
        {
           
            res.render('delete',{list:result})
            
        }
        else{
            console.log("delete error",err
            );
        }
    })
})
router.get('/final-delete-emp/:id',(req,res)=>{
   Employee.findByIdAndDelete(req.params.id,(err,result)=>{
    if(err) console.log(err);
    else 
   res.redirect('/emp/delete-emp')
})
})
// update user
router.get('/update-all-emp',(req,res)=>{
    Employee.find((err,result)=>{
        if(!err)
        {
           
            res.render('updateUser',{list:result})
            
        }
        else{
            console.log("Update error",err);
        }
    })
})
router.get('/edit-emp-data/:id',(req,res)=>{
    
        Employee.findById(req.params.id,(err,result)=>{
           if(err){
            console.log(err);
           } 
           else{
           
            res.render('finalupdateUser',{emp:result})
           }
        })
      
    
   
})
router.post('/final-update-emp',(req,res)=>{
 Employee.findByIdAndUpdate(req.body.id,req.body,{new:true},(err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        res.redirect("/emp/update-all-emp")
    }
 })

})
router.post('/api/posts',verifyToken,(req,res)=>{
           jwt.verify(req.token,'hello33000',(err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message:'Post Created!!!',
                data:data
            })
        }
    })
    res.json({
        message:'Post Created!!!'
    })
})

router.post('/login',(req,res)=>{
    // Mock user
    const user={
        id:1,
        username:'steve',
        password:'3000'
    }

    jwt.sign({user:user},'hello33000',{expiresIn:'30s'},(err,token)=>{
        res.json({token:token})
    })
})

//Format of token
//Authorization: Bearer <Token>
function verifyToken(req,res,next){

    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined

    if(typeof bearerHeader!='undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        // Get toke from the array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //next middleware
        next();
    }else{
        res.sendStatus(403)
    }

}


module.exports=router