const bcrypt = require('bcrypt');
const {sendForgetPasswordEmail}= require('./sendEmail.js');
const User = require('../User/userSchema');
const otpGenerator = require('otp-generator');
const auth = require('../middleware/auth');
const {validatePassword} = require('./validator');
const {validationResult} = require('express-validator');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    if (!req.body.emailOrUsername)
        return res.status(400).send('Bad request provide email or username');
    //get user by email or username
    const user =  await User.findOne({ $or: [ { username: req.body.emailOrUsername }, { email: req.body.emailOrUsername } ]});
    //if doesnt exist return
    if (!user) return res.status(404).send('User not found');
    
    //else create an otp and save it in database 
    const OTP =otpGenerator.generate(6, { digits: false ,upperCaseAlphabets: false, specialChars: false });
    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash (OTP,salt);
    user.set({passwordResetOTP:hashedOTP});
    const result = await user.save();

    //then send email with code
    try{
        await sendForgetPasswordEmail(user.email ,OTP);
        return res.status(200).send('Email sent');
    }
    catch (err){
        return res.status(409).send('couldnt send email there is a conflict the relevant resource');
    }
});

router.post('/codeVerification', async (req, res) => {
    if (!req.body.emailOrUsername || !req.body.code)
        return res.status(400).send('Bad request provide user email or username and verification code on request body');
    //get user by email or username
    const user =  await User.findOne({ $or: [ { username: req.body.emailOrUsername }, { email: req.body.emailOrUsername } ]});
    //if doesnt exist return
    if (!user) return res.status(404).send('User not found');
    if (!user.passwordResetOTP) return res.status(400).send('User didnt request reseting password');

    //else check written code againest the stored in db
    const validCode = await bcrypt.compare(req.body.code ,user.passwordResetOTP);
    if (validCode)
    {
        //1.remove passwordResetOTP field from user data
        await User.updateOne({ $or: [ { username: req.body.emailOrUsername }, { email: req.body.emailOrUsername } ]}
            ,{ $unset:{passwordResetOTP: "" }});

        //2.generate token to send in response header
        const token = user.generateJWT();
        return res.status(200).header('x-auth-token',token).send({'massege':'Correct Code', 'x-auth-token':token});
    }
    else{
        return res.status(400).send('Invalid code');
    }
    //Incorrect code: return failure
});
//protected route
router.post('/newPassword',[validatePassword],auth, async (req, res) => {
    //checks valid user token using auth middlware and then reset his password
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send(errors.array());
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpPassword = await bcrypt.hash (req.body.password,salt);
    const result =  await User.updateOne({ _id: req.user._id },{$set:{password:hashedpPassword}});
    if (result.matchedCount ==1){
        return res.status(200).send('password re-set successfuly');
    }
    return res.status(400).send('password reset failed');
});
module.exports = router;