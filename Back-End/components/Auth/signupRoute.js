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




module.exports = router;