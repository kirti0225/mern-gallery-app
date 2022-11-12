const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postRoutes = require('./routes/posts');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const app = express();
require('./db')
require("dotenv").config();


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    const path = require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(_dirname,'client','build','index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
