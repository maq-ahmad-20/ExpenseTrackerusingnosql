const path = require('path');
const Expense = require("../model/expense");




exports.reportsOfDay = async (req, res, next) => {

    try {
        const date = req.body.date;
        console.log(date);

        const expenses = await Expense.find({ date: date, userId: req.user._id })
        console.log(expenses)
        // const expenses = await Expense.findAll({
        //     where: { date: date, userUserid: req.user.userid },
        // });

        console.log(expenses)
        return res.status(200).send(expenses);


    } catch (err) {
        console.log(err)
    }
}


exports.reportsOfMonth = async (req, res, next) => {

    try {
        const month = req.body.month;
        console.log(month)
        let monthlyData = await Expense.find({

            date: { $regex: month },
            userId: req.user._id

        })

        console.log(monthlyData);
        return res.status(200).send(monthlyData)


    } catch (err) {
        console.log(err)
    }

}

exports.reportsOfYear = async (req, res, next) => {

    try {
        const year = req.body.year;
        console.log(year)
        let yearlyData = await Expense.find({


            date: { $regex: year },
            userId: req.user._id

        })

        console.log(yearlyData);
        return res.status(200).send(yearlyData)


    } catch (err) {
        console.log(err)
    }

}