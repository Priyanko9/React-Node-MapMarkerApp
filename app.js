const express=require("express");
const bodyParser=require("body-parser");
const markerRouter=require('./routes/markerRoutes');
const localStorage=require('localStorage');
localStorage.setItem("test","ywi");
const app=express();

app.use(bodyParser.json());

app.use('/marker',markerRouter);

app.listen(3006);

