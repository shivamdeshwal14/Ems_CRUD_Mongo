const express=require('express')
const Employee = require('../model/emp.model')
const router=express.Router()

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

module.exports=router