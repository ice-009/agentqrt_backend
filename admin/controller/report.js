// const faker = require('faker')
const { faker } = require('@faker-js/faker');
var path = require('path')
const ReportModel = require('../../model/sales_report')
const XLXS = require('xlsx')
const catchAsync = require("../../utils/catchAsync");
const CsvParser = require('json2csv').Parser


const reportget = catchAsync(async(req,res)=>{
    const report = await ReportModel.find()
    res.json(report)
})

const reportPost = catchAsync(async(req,res)=>{
    // for(var i=0;i<100;i++){
       
    //     await ReportModel.create({
    //         salesId:i+2,
    //         brandname:faker.name.firstName(),
    //     })
    // }
})

const reportExport = catchAsync(async(req,res)=>{
    var wb = XLXS.utils.book_new();

     const data =await ReportModel.find()

     let report = [];


     for (let index = 0; index <data.length; index++) {
        const { 
            phoneno,brandname
        } = data[index]
        report.push({phoneno,brandname})
        
     }


     const csvFields = ['Phoneno','Brandname']
     const csvParser = new CsvParser({csvFields})
     const csvData = csvParser.parse(report)

     res.setHeader("Content-Type","text/csv")
     res.setHeader("Content-Disposition","attatchment:filename=UserMetadata.csv")
     res.status(200).end(csvData)
})

// const 

module.exports = {
    reportget,
    reportPost,
    reportExport
}