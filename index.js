const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postRoutes = require('./routes/posts');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const app = express();
const {JWTPRIVATEKEY,DB,SALT}=require('./config/keys')
require('./db')
require("dotenv").config();


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// app.get("/",(req,res)=>{
//     res.json('server start')
// })

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

if(process.env.NODE_ENV=='production'){
    const path=require('path')
    app.get("/",(req,res)=>{
        app.use(express.static(__dirname,'client','build','index.html'))
    res.sendFile(__dirname,'client','build','index.html')
})
}

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
