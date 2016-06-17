var express = require('express');
var router = express.Router();
router.get('/',function(req,res,next){
	res.send("Hello");
})
router.post('/',function(req,res,next){
	console.log(req.body['ammount']);
});

module.exports = router;