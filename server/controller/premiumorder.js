
const razorPay = require('razorpay')
const Order = require('../model/premiumorder')
const User = require('../model/user')
const loginController = require('../controller/login')
exports.purchasePremiumMemberShip = async (req, res, next) => {


    try {
        //let userinstance = req.user;

        console.log(req.user)
        var rzp = new razorPay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        });

        const amount = 50000;
        rzp.orders.create({ amount, currency: "INR" }, async (error, order) => {
            if (error) {
                console.log(error)
                return
            }
            console.log(order.id)
            const userId = req.user._id;
            const newOrder = new Order({
                userId: userId,
                orderId: order.id,
                status: "PENDING",
            });
            await newOrder.save();
            return res.status(201).json({ order, key_id: rzp.key_id });
        });

    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Something went wrong", error: err });
    }

}

exports.updateTransactionStatus = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId)
        console.log(req.body)
        const { order_id, payment_id } = req.body;
        const order = await Order.findOne({ orderId: order_id });
        const promise1 = order.updateOne({
            paymentId: payment_id,
            status: "SUCCESSFUL",
        });
        const promise2 = User.updateOne({ _id: userId }, { isPremiumUser: true });

        Promise.all([promise1, promise2])
            .then(() => {
                return res.status(202).json({
                    sucess: true,
                    message: "Transaction Successful",
                    token: loginController.genretareAccessToken(userId)
                });
            })
            .catch((error) => {
                throw new Error(error);
            });
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: "Something went wrong" });
    }
};
