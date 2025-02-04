const path = require('path');
require('dotenv').config();
const DepartamentClass = require('./class/DepartmentClass');
const inputPath = path.join(__dirname, 'departments.csv');
const outputPath = path.join(__dirname, 'department.txt');
const departmentObject = new DepartamentClass();
departmentObject.proccessDepartaments(inputPath, outputPath).then(()=>{
    console.log("porccess success");
}).catch((error)=>{
    console.log("error", error);
})