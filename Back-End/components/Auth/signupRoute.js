const _= require('lodash');
const bcrypt = require('bcrypt');
const sendConfirmationEmail= require('./sendEmail.js');
const User = require('../User/userSchema');
const {Registerer, validateRegisterer } = require('./registerersSchema');


const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
   
    //request body is valid based on schema and joi validations
    const { error } = validateRegisterer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);


   // checking if user already exists
    const user =  await User.findOne({ email: req.body.email});
    let registerer =  await Registerer.findOne({ email: req.body.email});
    if (user || (registerer && registerer.confirmedEmail)) return res.status(400).send('User already registered.');

    if (registerer && !registerer.confirmedEmail) {
        const deleteRegisterer = await Registerer.deleteMany({email: req.body.email});
    }

    //generate otp for the new user and encrypt it 
    const otp = Math.floor(100000 + Math.random() * 900000);
    //const salt = await bcrypt.genSalt(10);
    //const encryptedOtp = await bcrypt.hash (otp,salt);
    
    registerer = new Registerer({
        name: req.body.name,
        email:req.body.email,
        birthdate: req.body.birthdate,
        otp: 123456
    }); 

    await registerer.save();
    try{
        await sendConfirmationEmail(registerer);
        res.status(200).send({registererId: registerer._id, statusCode: 201 , message: "Verifaication email sent" });
    }
    catch (err){
        res.status(409).send({ statusCode: 409, error: 'YALAHWYYY b2aaa email msh rady ytb3t' });
    }
    
});

router.post('/verifyEmail', async (req, res) => {
   
    let registerer =  await Registerer.findOne({ email: req.body.email});
    if (!registerer) return res.status(400).send('Error: you used an expired code/registerer not found');

    if (req.body.code === registerer.otp && req.body.email === registerer.email){

        const result =await Registerer.updateOne({email: req.body.email},{ $set:{confirmedEmail: true }});

        if (result.matchedCount == 1) return res.status(200).send('Email verified successfuly');
    }
        
    else return res.status(400).send('Incorrect verification code / Registeration session expired');
    
});

router.post('/setPassword', async (req, res) => {
   
    let registerer =  await Registerer.findOne({ email: req.body.email});
    if (!registerer) {
        return res.status(400).send('Registeration session expired..Try signing up again');
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
router.post('/setUsername', async (req, res) => {
   
    let registerer =  await Registerer.findOne({ email: req.body.email});
    if (!registerer) {
        return res.status(400).send('Registeration session expired..no registerer found with given email');
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
        return res.status(201).send({
            message:'User Registeration Successful!',
            token: token,
            data: {userId: user._id}
        });
    }
    
});


module.exports = router;