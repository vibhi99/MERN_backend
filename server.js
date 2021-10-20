const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const dotenv = require('dotenv')
dotenv.config()

const ProductRoute = require('./routes/product')
const AuthRoute = require('./routes/auth')

mongoose.connect('mongodb://localhost:27017/shopdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', (err)=> {
    console.log(err)
})

db.once('open', ()=> {
    console.log('Database Connected!!!')
})

const app = express()

app.get("/", (req, res, next) => {
    res.send("Welcome to main route!");
   });

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})


app.use('/api/product', ProductRoute)
app.use('/api', AuthRoute)