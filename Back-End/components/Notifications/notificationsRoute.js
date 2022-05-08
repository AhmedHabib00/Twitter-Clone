const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../User/userSchema');
const {getNotifications} = require('./notifications');
const auth=require('../middleware/auth');

router.get('/:userId',auth, async (req, res) => {

    if(!req.params.userId) return  res.status(404).send('userId not provided in request parameters'); 

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send('user not found');

    try{
        const result = await getNotifications(req.params.userId);
        return res.status(200).status(200).send(result);
    }
    catch(err){
        return res.status(500).json({
            error: err,
          });
    }
    

});
module.exports = router;