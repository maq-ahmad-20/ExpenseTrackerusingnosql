
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const premiumOrderSchema = new Schema({


    paymentId: {
        type: String,


    },
    orderId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },

    userId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    }

})

module.exports = mongoose.model('Order', premiumOrderSchema)







// const Sequelize = require("sequelize");
// const sequelize = require("../util/db");


// const Order = sequelize.define("order", {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     paymentid: Sequelize.STRING,
//     orderid: Sequelize.STRING,
//     status: Sequelize.STRING,
// });

// module.exports = Order;