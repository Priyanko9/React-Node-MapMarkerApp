const localStorage=require('localStorage');
const axios=require('axios');
const apikey=require('../util/constant');

let latLongs=JSON.parse(localStorage.getItem("latLongsList"))||[];
let url="https://us1.locationiq.com/v1/search.php?key="+apikey+"&q=kolkata&format=json"


exports.addLatLongs=(req,res,next)=>{
    let latLongSent=req.body;
    let storedLatLong=[];
    let length=latLongs.length;
    let present=false;
    if(length>0){
        for(let ele of latLongs){
            if(latLongSent.lat===ele.lat && latLongSent.long===ele.long){
                present=true;
                break;
            }
        }    
        if(!present){
            latLongs.push(latLongSent);
        }
    } else {
        latLongs.push(latLongSent);
    }
    
    localStorage.setItem("latLongsList",latLongs);
    res.status(200).send();
}
exports.readlatLongs=(req,res,next)=>{
    res.json(latLongs);
}

exports.editLatLongs=(req,res,next)=>{
    let editedLatLong=req.body;
    latLongs=latLongs.filter((ele)=>{
        if(editedLatLong.lat===ele.lat && editedLatLong.long===ele.long){
             return false;
        }
        return true;
    })
    localStorage.setItem("latLongsList",latLongs)
    res.json(latLongs);
}
exports.deleteLatLongs=(req,res,next)=>{
    let deletedLatLong=req.body;
    latLongs=latLongs.filter((ele)=>{
        if(deletedLatLong.lat===ele.lat && deletedLatLong.long===ele.long){
            return false;
        }
        return true;
    })
    localStorage.setItem("latLongsList",latLongs)
    res.status(200).send();
}

