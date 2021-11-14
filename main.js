const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const mongoose= require('mongoose')
const session = require('express-session')

const app = express();

//dotenv.config( { path : '.env'} )
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DB_URI,{useNewURLParser:true})
const db = mongoose.connection;

db.on('error',(error)=> console.log(error));
db.once('open',()=> console.log("connected to the database"))
// log requests


app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.use(session({
    secret:'my secret key',
    saveUninitialized:true,
    resave:true
}))
app.use((req,res,next)=>{
    res.locals.message= req.session.message
    delete req.session.message;
    next();
});
app.set('view engine','ejs');

app.use("",require("./routes/routes"));
app.use(express.static("uploads"));

app.listen(PORT, ()=> { console.log(`Server is running on ${PORT}`)});