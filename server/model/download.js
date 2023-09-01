
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dowmloadSchema = new Schema({


    fileurl: {
        type: String,
        required: true
    },

    userId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    }

})

module.exports = mongoose.model('Download', dowmloadSchema)



// const Sequelize = require('sequelize');

// const sequelize = require('../util/db');

// const Download = sequelize.define('download', {

//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     fileurl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }


// })

// module.exports = Download;