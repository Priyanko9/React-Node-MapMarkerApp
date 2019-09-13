const express=require("express");
const router=express.Router();
const markerController=require('../controllers/MarkerController');

router.get('/getMarkers',markerController.readlatLongs);
router.post('/addMarker',markerController.addLatLongs);
router.put('/editMarker',markerController.editLatLongs);
router.delete('/deleteMarker',markerController.deleteLatLongs);

module.exports=router;

