const express = require ('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require("ejs");
const User = require('../User/userSchema');

// creats new data of the user profile .(profile picture soon to be added)
/*router.post('/profile_settings',(req,res) => {
    const newprofile = new User({
        name:req.body.name,
        description:req.body.description,
        location:req.body.location,
        birthdate:req.body.birthdate

    });
    try{
        res.sendStatus(200);
        newprofile.save()
        .then(data =>{
            res.json(data);
        })
    }

    catch (err) {
        res.status(400);
        res.json({message: err});
    }
    
});*/

//gets data from the database about a single user
router.get('/:userProfileId/profile_settings', async(req,res) => {

    try{
        const user = await User.findById(req.params.userProfileId);
        // console.log(user);
        return res.status(200).send(user);
    }
    catch (err){
        return res.status(400).send("Couldnot find ID")
    }

});

//edits the existing values of a specific user in the database

router.patch('/:userProfileId/profile_settings',async (req,res) => {
    try{
        const updateUserProfile = await User.updateOne(
            {_id: req.params.userProfileId},
            {$set:{name:req.body.name, bio:req.body.bio, location:req.body.location, birthDate:req.body.birthdate }});
        res.json(updateUserProfile);
    }
    catch (err){
        res.status(400).send("Couldnot find ID")
    }

});

//Deletes a specific user's data in case the profile is deleted
/*router.delete('/:userProfileId/profile_settings', async (req,res) =>{
    try{

        const removedProfile = await Profile.remove({ _id: req.params.userProfileId});
        res.json(removedProfile);
    }
    catch(err){
        res.status(400).send("Couldnot find ID")
    }
});*/


module.exports = router;