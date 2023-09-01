const Sib = require('sib-api-v3-sdk');
const bycrypt = require('bcrypt')
const User = require('../model/user')
const { v4: uuidv4 } = require("uuid");
const ForgotPasswordRequest = require('../model/forgotpasswordrequest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

var globaluuid = "";
const saltRounds = 10;
const hashedPassword = async (userpassword) => {
    return await bcrypt.hash(userpassword, saltRounds);
};





exports.sendResetPasswordMail = async (req, res, next) => {
    try {

        const email = req.body.email;
        const requestId = uuidv4();

        const isOurEmailUSer = await User.findOne({ useremail: email });
        console.log(isOurEmailUSer)
        if (!isOurEmailUSer) {

            return res.status(404).json({ message: "The Mail is not registered with us please sign up " })
        }

        const forgetPassObj = new ForgotPasswordRequest({
            requestId: requestId,
            isActive: true,
            userId: isOurEmailUSer._id
        })
        await forgetPassObj.save()


        const client = Sib.ApiClient.instance

        const apiKey = client.authentications['api-key']

        apiKey.apiKey = process.env.API_KEY

        const transEmailAPi = new Sib.TransactionalEmailsApi()
        const sender = {
            email: "Maqboolahmad081@gmail.com",

        };
        const receivers = [
            {
                email: email,
            },
        ];
        let sendEmailtoUser = await transEmailAPi.sendTransacEmail({
            sender,
            To: receivers,
            subject: "Reset Password for Expense Tracker App",
            subject: "Please Reset Password",
            textContent: "Expense Tracker",
            htmlContent: `<h3>Link To Reset Password For Expense App</h3>
            <a href="http://localhost:6800/password/resetForgotPassword/{{params.requestId}}"> Click Here to reset password</a>`,
            params: {
                requestId: requestId,

            },


        });

        res.status(201).json({ success: true })

    } catch (err) {
        console.log(err)
    }
}


exports.updatePassword = async (req, res, next) => {

    try {

        let password = req.body.userpassword
        let hashpassword = await hashedPassword(password);

        const requestId = globaluuid
        console.log(requestId)
        console.log(globaluuid)

        let isUserPassExists = await ForgotPasswordRequest.findOne({ requestId: requestId })
        let passwordUpdateData = await ForgotPasswordRequest.updateOne({ requestId: requestId, isActive: true }, { $set: { isActive: false } })

        console.log(passwordUpdateData)
        let userid = isUserPassExists.userId;

        let updatePassword = await User.updateOne({ _id: userid }, { $set: { userpassword: hashpassword } });

        console.log(updatePassword)
        res.json({ success: true })

    } catch (err) {

        console.log(err)
        res.status(500).json(err);

    }

}

exports.showPasswordChangePage = async (req, res, next) => {

    try {
        console.log(req.params.requestId)
        let uuid = req.params.requestId
        let isUserPassExists = await ForgotPasswordRequest.findOne({ requestId: uuid })
        console.log(isUserPassExists)
        if (isUserPassExists.isActive) {
            globaluuid = uuid;
            return res.status(200).redirect('http://127.0.0.1:5500/FrontEnd/forgetPassword/forgotPasswordUpdate.html')
        } else {
            return res.status(500).json({ message: "Hey You Have Used this link " })
        }
    } catch (err) {
        console.log(err)
    }
}