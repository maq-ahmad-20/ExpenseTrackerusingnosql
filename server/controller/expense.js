const express = require('express');

const Expense = require('../model/expense');

const User = require('../model/user');

const AWS = require('aws-sdk');
const Download = require('../model/download')



function uploadToAwsS3(data, fileName) {

    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

    let awsS3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,

    })


    var params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: data,
        ACL: 'public-read'

    }
    return new Promise((resolve, reject) => {
        awsS3Bucket.upload(params, (err, response) => {
            if (err) {
                console.log("Something Went Wrong !!")
                reject(err);

            } else {
                console.log('success', response)
                resolve(response.Location);
            }
        })

    })


}



exports.downloadUserExpenses = async (req, res, next) => {
    try {

        const expenses = await Expense.find({ userId: req.user._id })     // or use findall on expenses passing foreign key from req.user
        console.log(expenses);

        const stringExpenses = JSON.stringify(expenses);
        const userid = req.user.userid;
        const fileName = `expenses${userid}/${new Date()}.txt`;
        const fileUrl = await uploadToAwsS3(stringExpenses, fileName)


        let newfiledowmload = new Download({
            fileurl: fileUrl,
            userId: req.user._id
        })
        await newfiledowmload.save()

        res.status(200).json({ fileUrl, success: true })


    } catch (err) {
        console.log(err)
        res.status(500).json({ fileUrl: "", success: false })
    }
}

exports.addExpense = async (req, res, next) => {



    try {

        const { expense, description, item, expenseamount, date } = req.body
        console.log(req.body)
        console.log(req.user)

        let existedUser = await User.findById(req.user._id)
        console.log(existedUser)
        existedUser.totalexpense += Number(expenseamount);
        await existedUser.save()
        let newExpense = new Expense({
            expense: expense,
            description: description,
            item: item,
            date: date,
            userId: req.user._id
        });

        let addedExpense = await newExpense.save();

        return res.json({ InsertedData: { addedExpense } })

    } catch (err) {

        console.log(err)

    }
}


exports.getAllExpense = async (req, res, next) => {

    try {

        //const { pageno, dataOnPage } = req.params;
        const pageno = +req.params.pageno
        const dataOnPage = +req.params.dataOnPage

        console.log(pageno)
        console.log(dataOnPage)
        let offset = ((pageno - 1) * dataOnPage)
        let limit = dataOnPage

        let totalCount = await Expense.count({ userId: req.user._id })

        let expenses = await Expense.find({ userId: req.user._id }).skip(offset).limit(limit)


        res.status(200).json({
            expensesData: expenses,
            currentPage: pageno,

            totalCount: Math.ceil(totalCount / 10)


        }) // sent users as arrays so we can parse in FE dont send stringifying as json send arrays as json obj

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }

}


exports.deleteUserExpense = async (req, res, next) => {

    try {

        let id = req.params.userid

        console.log(req.params)
        let expense = await Expense.findOne({ _id: id, userId: req.user._id });
        console.log(expense)
        const user = await User.findById(req.user._id)

        user.totalexpense = user.totalexpense - expense.expense;
        await user.save();

        await Expense.deleteOne({ _id: id, userId: req.user._id })


        res.json({ success: true })


    } catch (err) {

        console.log(err)

    }
}


exports.getSingleUserExpense = (req, res, next) => {


    let id = req.params.expenseid;
    Expense.findOne({ userId: req.user._id, _id: id })
        .then(result => {
            console.log(result)

            return res.json({ fethchedSingleData: { result } })

        })


}


exports.editUserExpense = async (req, res, next) => {


    try {


        const { id, expense, description, item } = req.body
        console.log(id)
        let prevexpense = await Expense.findOne({ _id: id, userId: req.user._id });
        console.log(prevexpense)
        const user = await User.findById(req.user._id)

        user.totalexpense = (user.totalexpense - prevexpense.expense) + Number(expense);
        await user.save();

        let response = await Expense.updateOne({ _id: id, userId: req.user._id }, {
            expense: expense,
            description: description,
            item: item,
        })


        res.json({ updatedData: response })

    } catch (err) {
        console.log(err)
    }





}


exports.getAllDownloadedFileUrls = async (req, res, next) => {

    try {



        let downloadedData = await Download.find({ userId: req.user._id })

        res.status(200).json({ allData: downloadedData })


    } catch (err) {
        console.log(err);
        res.status(500).json({ success: 'false' })
    }
}