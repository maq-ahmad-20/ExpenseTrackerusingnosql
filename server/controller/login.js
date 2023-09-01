


const User = require('../model/user');

const bcrypt = require('bcrypt')

const path = require('path')
const jwt = require('jsonwebtoken')


function genereteAcessToken(id) {
    return jwt.sign({ userid: id }, process.env.JWT_SECRET)
}
exports.checkPremierUser = async (req, res, next) => {

    try {

        let user = req.user;
        //console.log(user)
        if (user.isPremiumUser) {

            return res.json({ premierUser: true })
        }
        return res.json({ premierUser: false })

    } catch (err) {
        console.log(err)
    }
}


exports.postloginuser = async (req, res, next) => {

    const { useremail, userpassword } = req.body;

    let useremailexistinDb = await User.findOne({ useremail: useremail })

    console.log(useremailexistinDb)

    if (!useremailexistinDb) {
        return res.status(404).json({ data: "User not found" })
    }


    bcrypt.compare(userpassword, useremailexistinDb.userpassword, (err, response) => {


        if (err) {
            return res.status(500).json({ message: "something went wrong" })

        }

        if (response) {


            console.log(response)

            res.status(200).json({
                data: {
                    "successfullylogged": true,
                    "token": genereteAcessToken(useremailexistinDb._id)
                }
            })
        } else {


            res.status(401).json({ data: "User not authorized" })

        }


    })


}



module.exports.genretareAccessToken = genereteAcessToken 
