const express = require("express");
const router = express.Router();
const Student = require("../model/student");
const mongoose = require('mongoose');
const checkAuth = require("../middleware/check-auth")
const StudentDataValidation= require("../validation/student_data");
const {validate} = require('express-validation');
const ExcelJs = require('exceljs');
const XLSX = require('xlsx');
const path = require('path');
const student = require("../model/student");
var fs = require('fs');
//router.get('/',(req,res,next)=>{
//     res.status(200).json({
//         msg:'this is student get request'
//     })
// })



router.get('/studentSheet',async(req,res,next)=>{
    
    var student = await Student.find();
    // exec();
    const workbook= new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('My Students');
    worksheet.columns=[
        {header:"Sno.",key:"s_no",width:10},
        {header:"Name",key:"name",width:10},
        {header:"Email",key:"email",width:10},
        {header:"Phone",key:"phone",width:10},
        {header:"Gender",key:"gender",width:10}
        ];
        let count =1;
        student.forEach(students => {
            (students).s_no = count
            // console.log(typeof(students));
            // worksheet.addRow({s_no:(students.s_no).toString(),name:students.name,email:students.email,phone:(students.phone).toString(),gender:students.gender});
            worksheet.addRow(students);
            count+=1;
        });
        worksheet.getRow(1).eachCell((cell)=>{
            cell.font={bold:true};
        });
        const data = workbook.xlsx.writeFile('excelsheet1.xlsx')
        // var binaryData = fs.readFileSync('file5.xlsr');
        // var base64String = new Buffer(binaryData).toString("base64");

        // return workbook.xlsx.write(res).then(function () {
        //     res.status(200).end(base64String);
        //   });

        .then(result=>{
        res.status(200).json({
            msg:"Sheet laoded successfully"
        });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
           })

 })

//GET ALL ITEM
router.get('/',checkAuth,(req,res,next)=>{
   Student.find()
   .then(result=>{
    res.status(200).json({
        studentData:result
    });
   })

   .catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
   })
})



// router.post('/',(req,res,next)=>{
//     res.status(200).json({
//         msg:'this is student post request'
//     })
// })

//ADD ITEM
router.post('/',checkAuth,validate(StudentDataValidation.createOrUpdateUser),(req,res,next)=>{
    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender
    })

    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent:result
        })
    })

    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//GET ONE ITEM
router.get('/:id',checkAuth,(req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            studentData:result
        });
       })
    
       .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
       })
})

//DELETE ITEM REQUEST
router.delete('/:id',checkAuth,(req,res,next)=>{
    Student.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:"product deleted!",
            studentData:result
        });
       })
    
       .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


//PUT FOR UPDATE
router.put('/:id',checkAuth,(req,res,next)=>{
    // console.log(req.params.id);
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender
        }
    })
    .then(result=>{
        res.status(200).json({
            message:"product updated!",
            studentData:result
        });
       })
    
       .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;