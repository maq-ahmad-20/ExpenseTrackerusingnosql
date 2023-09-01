const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forgotPasswordReset = new Schema({
    requestId: {
        type: String,
        required: true,
        unique: true,
    },

    isActive: {
        type: Boolean,
        required: true
    },

    userId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    }

})

module.exports = mongoose.model('ForgotPasswordReset', forgotPasswordReset)


// const Sequelize = require("sequelize");
// const sequelize = require("../util/db");

// const ForgotPasswordReset = sequelize.define("ForgotPasswordRequest", {
//     id: {
//         type: Sequelize.STRING,
//         primaryKey: true,
//         allowNull: false,
//     },
//     isActive: Sequelize.BOOLEAN,
// });

// module.exports = ForgotPasswordReset;