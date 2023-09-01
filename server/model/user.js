const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true
    },
    userphonenumber: {
        type: Number,
        required: true
    },
    userpassword: {
        type: String,
        required: true
    },
    isPremiumUser: {
        type: Boolean,
        default: false
    },
    totalexpense: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model('User', UserSchema)


// const Sequelize = require('sequelize');

// const sequelize = require('../util/db');

// const User = sequelize.define('users', {

//     userid: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     username: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },

//     useremail: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },

//     userphonenumber: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },


//     userpassword: {
//         type: Sequelize.STRING,
//         allowNull: true
//     },

//     isPremiumUser: Sequelize.BOOLEAN,

//     totalexpense: {
//         type: Sequelize.INTEGER,
//         defaultValue: 0
//     }



// })

// module.exports = User;