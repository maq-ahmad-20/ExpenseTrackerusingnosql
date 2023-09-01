const path = require('path')

const User = require('../model/user');
const Expense = require('../model/expense');





exports.getAllExpensesOfUSers = async (req, res, next) => {

    try {

        let totaldata = await User.find().sort('totalExpense')

        // let userAggregatedata = await User.findAll({
        //     attributes: ['userid', 'username', [sequelize.fn('sum', sequelize.col('users.totalexpense')), 'total_cost']],
        //     group: ['users.userid'],
        //     order: [['total_cost', 'DESC']]
        // })

        console.log(totaldata)

        res.status(201).json(totaldata);

    } catch (err) {
        console.log(err)
    }


}


