const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    expense: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },

    userId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    }

})

module.exports = mongoose.model('Expense', expenseSchema)




// const Sequelize = require('sequelize');

// const sequelize = require('../util/db');

// const Expense = sequelize.define('expense', {

//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     expense: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },

//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     item: {
//         type: Sequelize.STRING,
//         allowNull: true
//     },
//     date: {
//         type: Sequelize.STRING,
//         allowNull: true,
//     }

// })

// module.exports = Expense;