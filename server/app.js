const express = require('express');

const mongoose = require('mongoose')
const fs = require('fs')
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./router/user')
const loginRouter = require('./router/login')

const expenseRouter = require('./router/expense')

const premiumOrderRouter = require('./router/premiumorder')
const leaderboardRouter = require('./router/leaderboard')
const forgotPasswordRouter = require('./router/forgotpassword')



const reportsRouter = require('./router/reports')

require('dotenv').config()
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))

// const accessLogStream = fs.createWriteStream(
//     'access.log',
//     { flags: "a" }
// );

// const morgan = require("morgan");
// app.use(morgan("combined", { stream: accessLogStream }));




app.use(cors())

app.use(express.json())






app.use(userRouter)

app.use(loginRouter);
app.use('/expense', expenseRouter)
app.use(premiumOrderRouter)
app.use(leaderboardRouter)
app.use('/password', forgotPasswordRouter)
app.use(reportsRouter)



const PORT = process.env.PORT || 6800
const mongocred = process.env.MongoConnectCredentials
mongoose.connect(`mongodb+srv://${mongocred}@cluster0.er34oav.mongodb.net/expensetracker?retryWrites=true`).then((result) => {

    app.listen(PORT);


    console.log("connected to mongodb and listening to port " + PORT)
})

