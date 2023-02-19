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

module.exports=router