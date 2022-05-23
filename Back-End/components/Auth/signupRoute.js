const bcrypt = require('bcrypt');
const {sendConfirmationEmail}= require('./sendEmail.js');
const User = require('../User/userSchema');
const {Registerer, validateRegisterer } = require('./registerersSchema');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const {validationResult} = require('express-validator');
const {validateDOB,validateEmail,validateName,validateCode ,validateUsername,validatePassword} = require('./validator');



const express = require('express');
const router = express.Router();

router.post('/', [validateDOB ,validateEmail, validateName],async (req, res) => {
    
    //return (res.status(201).send({statusCode: 201 , message: "Verifaication email sent" }));
    //request body is valid based on schema and joi validations
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send(errors.array());
    }
    //console.log( req.body)
   // checking if user already exists
    const user =  await User.findOne({ email: req.body.email});
    var registerer =  await Registerer.findOne({ email: req.body.email});
    //console.log(req.body);

    if (user || (registerer && registerer.confirmedEmail)) return res.status(400).send('User already registered.');

    if (registerer && !registerer.confirmedEmail) {
        const deleteRegisterer = await Registerer.deleteMany({email: req.body.email});
    }

    //generate otp for the new user 
    const OTP =otpGenerator.generate(6, { digits: true ,lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash (OTP,salt);

        
    registerer = new Registerer({
        name: req.body.name,
        email:req.body.email,
        birthdate: req.body.birthdate,
        otp: hashedOTP
    }); 

    try{
        const result= await registerer.save();
        await sendConfirmationEmail(req.body.email,OTP);
        return res.status(201).send({registererId: registerer._id, statusCode: 201 , message: "Verifaication email sent" });
    }
    catch (err){
        return res.status(409).send({ statusCode: 409, error: 'couldnt send email there is a conflict the relevant resource' });
    }


});

router.patch('/verifyEmail', [validateEmail,validateCode],async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send(errors.array());
    }
   
    let registerer =  await Registerer.findOne({ email: req.body.email});
    if (!registerer) return res.status(400).send('Error: registerer not found');


    const validCode = await bcrypt.compare(req.body.code.toString() ,registerer.otp);
    if (validCode && req.body.email === registerer.email){

        const result =await Registerer.updateOne({email: req.body.email},{ $set:{confirmedEmail: true }});

        if (result.matchedCount == 1) {
            const token = jwt.sign({_id: registerer._id, email: registerer.email},
                process.env.JWT_SECRET_KEY ,{expiresIn :'1d'});
            return res.status(200).header('x-auth-token',token).send({"message":"verified successfuly" ,"x-auth-token":token});
        }
    }
        
    else return res.status(400).send('Incorrect verification code - Registeration session expired');
    
});
//protected routes
router.patch('/setPassword', [validateEmail,validatePassword],auth, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send(errors.array());
    }
   
    if (req.user.email != req.body.email )
        return res.status(403).send('Invalid token access denied');

   
    let registerer =  await Registerer.findOne({ email: req.body.email});
    if (!registerer) {
        return res.status(400).send('Registeration session expired..registerer not found');
    }

    if (!registerer.confirmedEmail) {
        return res.status(400).send('FATAL ERROR : cannot set password (Account email is not verified)');
    }
    if (registerer.passwordSet) {
        return res.status(400).send('FATAL ERROR : password already set for the account ');
    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hasshedpPassword = await bcrypt.hash (req.body.password,salt);
    const result = await Registerer.updateOne({email: req.body.email},{ $set:{password: hasshedpPassword , passwordSet: true}});

    if (result.matchedCount ==1){
        return res.status(200).send('password Set successfuly');
    }
    else 
    return res.status(400).send('Registeration session expired..Try signing up again');
});
router.post('/setUsername', [validateEmail, validateUsername],auth, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send(errors.array());
    }
    if (req.user.email != req.body.email )
        return res.status(403).send('Invalid token access denied');
   
    let registerer =  await Registerer.findOne({ email: req.body.email});
    if (!registerer) {
        return res.status(404).send('Registeration session expired..no registerer found with given email');
    }

    if (!registerer.confirmedEmail) {
        return res.status(400).send('FATAL ERROR : cannot set setUsername (Account email is not verified)');
    }
    if (!registerer.passwordSet) {
        return res.status(400).send('FATAL ERROR :account password not set');
    }
    //check username is is not already in use
    const user =  await User.findOne({ username: req.body.username});
    if (user){
        return res.status(400).send('username already in use');
    } 

    else {
        const user = new User({
            name: registerer.name,
            email:registerer.email,
            birthdate: registerer.birthdate,
            password: registerer.password,
            username: req.body.username

        }); 
        const token = user.generateJWT();
        const result = await user.save();
        const deleteRegisterer = await Registerer.deleteMany({email: req.body.email});
        return res.status(201).header('x-auth-token',token).send({
            message:'User Registeration Successful!',
            data: {userId: user._id,role:user.role},
            "x-auth-token":token
        });
    }
    
});


module.exports = router;